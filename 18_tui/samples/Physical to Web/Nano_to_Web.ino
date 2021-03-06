/**
Physical to Webpage networking example.

The Arduino Publishes the value of a potentionmeter to a webpage.
**/

#include <WiFiNINA.h>
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <ArduinoJson.h>

char ssid[] = "wifi home";
//password of your WPA Network
char pass[] = "lachapelle";

char pubkey[] = "pub-c-b4b683ef-1879-49f9-a476-a527defd00f1";
char subkey[] = "sub-c-51100418-f2d5-11ea-afa2-4287c4b9a283";

int status = WL_IDLE_STATUS;       // the Wifi radio's status

// outgoing JSON variables
char msg[64]; // variable for the JSON to be serialized into for your outgoing message
const char* myName = "Ats"; // place your name here, this will be put into your "sender" value for an outgoing messsage

const static char channel[] = "nano-to-web"; // channel to use

StaticJsonDocument<200> sending; // The JSON from the outgoing message

int analogInput = A0; // pin for the your potentiometer
int analogValue; // value of A0

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
