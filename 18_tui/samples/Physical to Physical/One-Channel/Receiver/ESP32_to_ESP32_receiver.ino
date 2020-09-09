
/**
Physical to Physical networking example - Reciever

This example subscribes to the value of a networked potentiometer on the same channel and app. The potentiometer controls the on brightness of an LED on this board. 

This example requires one channel and the same Publish and Subscribe keys. 

**/

#include "WiFi.h"
#include <PubNub.h>
#include <ArduinoJson.h>

#define PubNub_BASE_CLIENT WiFiClient

const char* ssid = "Your Wifi network name here"; // your Wifi Network name here
const char* password = "Your Wifi password here"; // your Wifi password here

int status = WL_IDLE_STATUS;  // the Wifi status


char pubkey[] = "INSERT THE PUBLISH KEY HERE"; // the publish key needs to be the same to the person you are talking to
char subkey[] = "INSERT THE SUBSCRIBE KEY HERE";// the subscribe key needs to be the same to the person you are talking to

const static char pubChannel[] = "one-way-physical"; // channel to publish to

StaticJsonDocument<200> receiving; // the JSON from the incoming message

// incoming JSON variables
const char* sender; // variable for the JSON value "sender" on an incoming message
int incomingValue; // variable for the incoming LED brightness value to be stored

int myPin = 27; // your LED light pin


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
}

void loop() {

  SubscribetoPubNub(); // fetch the incoming message from the other user's channel
  delay(100); // wait a moment so that you can subscribe successfully

  analogWrite(theirPin, incomingValue); // write the incoming LED brightness to "their" pin
  delay(50); // wait a moment to restart

}

void SubscribetoPubNub() {

  String val; // value of incoming message

  PubSubClient* sclient = PubNub.subscribe(myChannel); // subscribe to the channel

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
