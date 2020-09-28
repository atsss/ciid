#include <WiFiNINA.h> //wifi
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <ArduinoJson.h>
#include <Array.h>

char ssid[] = "wifi home";
//password of your WPA Network
char pass[] = "passpass";

char pubkey[] = "pub-c-b5bebc3e-454d-4a9e-b2e6-hogehoge";
char subkey[] = "sub-c-d66f402e-f2d5-11ea-ae2d-fugafuga";

int status = WL_IDLE_STATUS;       // the Wifi radio's status

// outgoing JSON variables
char msg[64]; // variable for the JSON to be serialized into for your outgoing message
const char* myName = "Triple A"; // place your name here, this will be put into your "sender" value for an outgoing messsage

const static char channel[] = "crosswalk"; // channel to use

StaticJsonDocument<200> sending; // The JSON from the outgoing message

// defines pins numbers
const int trigPin1 = 3;
const int echoPin1 = 2;
const int trigPin2 = 5;
const int echoPin2 = 4;
const int trigPin3 = 7;
const int echoPin3 = 6;
const int trigPin4 = 9;
const int echoPin4 = 8;

// defines variables
long duration;
int distance1;
int distance2;
int distance3;
int distance4;
int minDist = 10;
int maxDist = 50;
//SWITCH RELATED
int switchState = 0;
int swtchSnsr = 12;
//JASON Notes
int flagA = 0;
int flagS = 0;
int flagD = 0;
int flagF = 0;
int volumeA = 0;
int volumeS = 0;
int volumeD = 0;
int volumeF = 0;

//WIFI RELATED
void setup() {
  Serial.begin(9600); // Starts the serial communication
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

  //set up pins
  pinMode(swtchSnsr, INPUT);
  pinMode(trigPin1, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin1, INPUT); // Sets the echoPin as an Input
  pinMode(trigPin2, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin2, INPUT); // Sets the echoPin as an Input
  pinMode(trigPin3, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin3, INPUT); // Sets the echoPin as an Input
  pinMode(trigPin4, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin4, INPUT); // Sets the echoPin as an Input

}
void loop() {
  //ON/OFF button
  distSensor1();
  distSensor2();
  distSensor3();
  distSensor4();
  distONOFF();
  turnONOFF();

  sendMessage();
}
void distONOFF(){
  if (distance1 >= minDist && distance1 <= maxDist){
    printSensor1();
    flagA = 1;
    volumeA = distance1;
  } else {
    flagA = 0;
    volumeA = 0;
  }
  if (distance2 >= minDist && distance2 <= maxDist){
    printSensor2();
    flagS = 1;
    volumeS = distance2;
  } else {
    flagS = 0;
    volumeS = 0;
  }
  if (distance3 >= minDist && distance3 <= maxDist){
    printSensor3();
    flagD = 1;
    volumeD = distance3;
  } else {
    flagD = 0;
    volumeD = 0;
  }
  if (distance4 >= minDist && distance4 <= maxDist){
    printSensor4();
    flagF = 1;
    volumeF = distance4;
  } else {
    flagF = 0;
    volumeF = 0;
  }
}
void turnONOFF(){
  //Trigger Button
  switchState = digitalRead(swtchSnsr);
  if (switchState == HIGH){
    //the witch is off
  }
  else {
    //the switch is pressed
   printSensor1();
  }
}
void distSensor1(){
  // Clears the trigPin
  digitalWrite(trigPin1, LOW);
  delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin1, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin1, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin1, HIGH);
// Calculating the distance
  distance1= duration*0.034/2;
// Prints the distance on the Serial Monitor
}

void distSensor2(){
  // Clears the trigPin
  digitalWrite(trigPin2, LOW);
  delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin2, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin2, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin2, HIGH);
// Calculating the distance
  distance2= duration*0.034/2;
// Prints the distance on the Serial Monitor
}

void distSensor3(){
  // Clears the trigPin
  digitalWrite(trigPin3, LOW);
  delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin3, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin3, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin3, HIGH);
// Calculating the distance
  distance3= duration*0.034/2;
// Prints the distance on the Serial Monitor
}

void distSensor4(){
  // Clears the trigPin
  digitalWrite(trigPin4, LOW);
  delayMicroseconds(2);
// Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin4, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin4, LOW);
// Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin4, HIGH);
// Calculating the distance
  distance4= duration*0.034/2;
// Prints the distance on the Serial Monitor
}

void printSensor1(){
   Serial.print("Distance1: ");
   Serial.println(distance1);
}
void printSensor2(){
   Serial.print("Distance2: ");
   Serial.println(distance2);
}
void printSensor3(){
   Serial.print("Distance3: ");
   Serial.println(distance3);
}
void printSensor4(){
   Serial.print("Distance4: ");
   Serial.println(distance4);
}

void sendMessage() {

  // assemble the JSON to publish
  sending["sender"] = myName; // first key value is sender: yourName
  sending["a"] = flagA;
  sending["s"] = flagS;
  sending["d"] = flagD;
  sending["f"] = flagF;
  sending["volume"] = getMaxVolume();

  Serial.println(getMaxVolume());

  serializeJson(sending, msg); // serialize JSON to send - sending is the JSON object, and it is serializing it to the char msg

  WiFiClient* client = PubNub.publish(channel, msg); // publish the variable char
  if (!client) {
    Serial.println("publishing error"); // if there is an error print it out
  }

}

int getMaxVolume() {
  int max = volumeA;
  if (volumeS > max) max = volumeS;
  if (volumeD > max) max = volumeD;
  if (volumeF > max) max = volumeF;

  return max;
}
