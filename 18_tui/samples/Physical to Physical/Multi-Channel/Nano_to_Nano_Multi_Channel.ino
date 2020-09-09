/**
Physical to Physical networking example

This example publishes the value of your potentiometer to a channel. The potentiometer controls the brightness of one LED on your circuit

On another channel, you are subscribed to receive the value of another person's potentiometer. This value controls the brightness of the other LED on your circuit. 

This example requires two different channel names but uses the same Publish and Subscribe keys. 

**/


#include <WiFiNINA.h>
#include <PubNub.h>
#include <ArduinoJson.h>

#define PubNub_BASE_CLIENT WiFiClient

char ssid[] = "Your Wifi network name here"; // your Wifi Network name here
char pass[] = "Your Wifi password here"; // your Wifi password here

int status = WL_IDLE_STATUS;  // the Wifi status


char pubkey[] = "INSERT THE PUBLISH KEY HERE"; // the publish key needs to be the same to the person you are talking to
char subkey[] = "INSERT THE SUBSCRIBE KEY HERE";// the subscribe key needs to be the same to the person you are talking to

const static char pubChannel[] = "yourChannel"; // channel to publish to
const static char subChannel[] = "theirChannel"; // channel to subscribe to

StaticJsonDocument<200> receiving; // the JSON from the incoming message
StaticJsonDocument<200> sending; // The JSON from the outgoing message

// incoming JSON variables
const char* sender; // variable for the JSON value "sender" on an incoming message
int incomingValue; // variable for the incoming LED brightness value to be stored

// outgoing JSON variables
char msg[64]; // variable for the JSON to be serialized into for your outgoing message
const char* myName = "Name"; // place your name here, this will be put into your "sender" value for an outgoing messsage

int ledBrightness; // value of how bright your LED is set

int analogInput = A0; // pin for the your potentiometer
int analogValue; // value of A0

int myPin = 11; // your LED light pin
int theirPin = 10; // their LED light pin


void setup() {

  Serial.begin(115200);

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

  PubNub.begin(pubkey, subkey); // begin PubNub connection
  Serial.println("PubNub set up");

  pinMode(myPin, OUTPUT); // set LED pin as an output
  pinMode(theirPin, OUTPUT); // set LED pin as an output

}

void loop() {

  analogValue = analogRead(analogInput); // read your potentiometer value

  // Serial.println(analogValue);
  ledBrightness = map(analogValue, 0, 1023, 0, 255); // map the value to the brightness of your LED
  analogWrite(myPin, ledBrightness); // set your LED to your mapped brightness

  sendMessage(ledBrightness); // Publish this LED brightness to PubNub
  delay(100); // wait a moment so that you can publish successfully 
  
  SubscribetoPubNub(); // fetch the incoming message from the other user's channel
  delay(100); // wait a moment so that you can subscribe successfully 
  
  analogWrite(theirPin, incomingValue); // write the incoming LED brightness to "their" pin
  delay(50); // wait a moment to restart

}

void sendMessage(int lb) {
  
  // assemble the JSON to publish
  sending["sender"] = myName; // first key value is sender: yourName
  sending["ledValue"] = lb; // second key value is ledValue: ledBrightness

  serializeJson(sending, msg); // serialize JSON to send - sending is the JSON object, and it is serializing it to the char msg
  
  WiFiClient* client = PubNub.publish(pubChannel, msg); // publish the variable char 
  if (!client) {
    Serial.println("publishing error"); // if there is an error print it out 
  }

}

void SubscribetoPubNub() {

  String val; // value of incoming message
  
  PubSubClient* sclient = PubNub.subscribe(subChannel); // subscribe to "their" channel

  SubscribeCracker ritz(sclient); // this "SubscribeCracker" object allows for light storage and less lag on the subscribe 
  while (!ritz.finished()) {
    ritz.get(val); // get the incoming message
    if (val.length() > 0) { // if there is a message... 
      printMessage(val); // pass it onto the printMessage function to deserialize it to use in the code
    }
  }

  sclient->stop();
}

void printMessage(String v) {

  deserializeJson(receiving, v); // parse the  JSON value received

  sender = receiving["sender"]; // this is will be "their name"

  incomingValue = receiving["ledValue"]; // the value of their LED brightness

  // print out incoming message results
  Serial.print("sender: ");
  Serial.println(sender);
  Serial.print("ledValue: ");
  Serial.println(incomingValue);

}
