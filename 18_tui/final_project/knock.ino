#include <WiFiNINA.h>
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <ArduinoJson.h>

// settings for wifi
char ssid[] = "wifi home";
char pass[] = "lachapelle";

char pubkey[] = "pub-c-b4b683ef-1879-49f9-a476-a527defd00f1";
char subkey[] = "sub-c-51100418-f2d5-11ea-afa2-4287c4b9a283";

int status = WL_IDLE_STATUS;       // the Wifi radio's status

// outgoing JSON variables
char msg[64]; // variable for the JSON to be serialized into for your outgoing message
const char* myName = "triplea"; // "sender" value for an outgoing messsage

const static char channel[] = "upe"; // channel to use

StaticJsonDocument<200> sending; // The JSON from the outgoing message

// define pins
const int pinAdc = A0;
const int pinLed = 2;
const int trigPin = 3;
const int echoPin = 4;

// for motion sensor
long duration;
int distance;
const int minDist = 0;
const int maxDist = 100;

// for sound sensor
const int activateCount = 2;
const float knockActivateSound = 4.5;
const float voiceActivateSound = 4.5;

// define states
enum State { WATCHING, WAITING, LISTENING, PLAYING };
State state = WATCHING;

// durations for each state
const int waitingDuration = 10000; // [msec] => 10 [sec]
const int listeningDuration = 10000; // [msec] => 10 [sec]
long startWaitingTime = 0;
long startListeningTime = 0;

// variables for knock and upe
const int knockDuration = 1000; // [msec] => 1 [sec]
const int voiceDuration = 3000; // [msec] => 3 [sec]
const int bounceDelay = 240;
int knockCount = 0;
long lastKnockTime = 0;

void setup() {
  Serial.begin(9600);

  while (!Serial); //Initialize serial and wait for port to open:

  // attempt to connect to Wifi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to the network, SSID: ");
    Serial.println(ssid);
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  // once you are connected :
  Serial.print("You're connected to the network");

  PubNub.begin(pubkey, subkey);
  Serial.println("PubNub set up");

  pinMode(pinLed, OUTPUT);
}

void loop() {
  long currentTime = millis();
  float result = analogRead(pinAdc) / 1024.0 * 5.0;

  switch(state) {
    case WATCHING:
      // Serial.println("I'm WATCHING");
      getDistance();

      if (distance >= minDist && distance <= maxDist){
        startWaitingTime = currentTime;
        state = WAITING;
      }
      break;
    case WAITING:
      // Serial.println("I'm WAITING");

      if (result > knockActivateSound) {
        if (knockCount == 0) {
          Serial.println("Hey 1");
          knockCount++;
        } else if (knockCount < activateCount && currentTime - lastKnockTime < knockDuration) {
          Serial.println("Hey 2");
          knockCount++;
        } else if (knockCount >= activateCount && currentTime - lastKnockTime < knockDuration) {
          Serial.println("Hey 3");
          knockCount = 0;
          startListeningTime = currentTime;
          state = LISTENING;
        }

        Serial.println(result);
        delay(bounceDelay);
        lastKnockTime = currentTime;
      }

      if (currentTime - startWaitingTime > waitingDuration) state = WATCHING;
      break;
    case LISTENING:
      Serial.println("I'm LISTENING");
      if (result > voiceActivateSound) state = PLAYING;
      if (currentTime - startListeningTime > listeningDuration) state = WATCHING;
      break;
    case PLAYING:
      Serial.println("I'm PLAYING");

      sendMessage(); // publish this value to PubNub

      digitalWrite(pinLed, HIGH);
      delay(2000);
      digitalWrite(pinLed, LOW);
      state = WATCHING;

      break;
  }
}

void getDistance() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance
  distance = duration*0.034/2;

  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
}

void sendMessage() {
  // assemble the JSON to publish
  sending["sender"] = myName; // first key value is sender: yourName
  sending["value"] = "Play"; // second key value is the potiometer value: analogValue

  serializeJson(sending, msg); // serialize JSON to send

  WiFiClient* client = PubNub.publish(channel, msg); // publish the variable char
  if (!client) Serial.println("publishing error"); // if there is an error print it out
}
