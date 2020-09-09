/**
Physical to Webpage networking example.

ESP32 Publishes the value of a potentionmeter to a webpage. 
**/

#include "WiFi.h"
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <ArduinoJson.h>

const char* ssid = "Your Wifi network name here"; // your Wifi Network name here
const char* password = "Your Wifi password here"; // your Wifi password here

char pubkey[] = "Your Publish Key Here";
char subkey[] = "Your Subscribe Key HEre";

int status = WL_IDLE_STATUS;       // the Wifi radio's status

// outgoing JSON variables
char msg[64]; // variable for the JSON to be serialized into for your outgoing message
const char* myName = "Name"; // place your name here, this will be put into your "sender" value for an outgoing messsage

const static char channel[] = "nano-to-web"; // channel to use

StaticJsonDocument<200> sending; // The JSON from the outgoing message

int analogInput = 15 // pin for the your potentiometer
int analogValue; // value of 15

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
  
  PubNub.begin(pubkey, subkey);
  Serial.println("PubNub set up");

}


void loop() {

  analogValue = analogRead(analogInput); // read your potentiometer value

  sendMessage(analogValue); // publish this value to PubNub
  delay(200); // wait 200ms to avoid lag
}

void sendMessage(int val) {
  
  // assemble the JSON to publish
  sending["sender"] = myName; // first key value is sender: yourName
  sending["value"] = val; // second key value is the potiometer value: analogValue

  serializeJson(sending, msg); // serialize JSON to send - sending is the JSON object, and it is serializing it to the char msg
  
  WiFiClient* client = PubNub.publish(channel, msg); // publish the variable char 
  if (!client) {
    Serial.println("publishing error"); // if there is an error print it out 
  }

}
