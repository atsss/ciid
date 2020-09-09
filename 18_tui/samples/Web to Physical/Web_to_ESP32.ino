/**
Web to Physical.

Using the subscribe feature of PubNub, this example receives the value of either 255 or 0 from a p5 sketch.

If the incoming value is 255, the LED turns on. 
If the incoming value is 0, the LEF turns off. 

**/

#include "WiFi.h"
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <ArduinoJson.h>

const char* ssid = "Your Wifi network name here"; // your Wifi Network name here
const char* password = "Your Wifi password here"; // your Wifi password here

char pubkey[] = "Your Publishing Key Here";
char subkey[] = "Your Subscription Key Here";

int status = WL_IDLE_STATUS; 

const static char channel[] = "web-to-nano"; // channel to use

StaticJsonDocument<200> doc; // JSON object for receiving the incoming values
 
const char* sender; 
int messageText;

int ledPin = 27; // LED pin

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

  PubNub.begin(pubkey, subkey); // Establish a connection with PubNub
  Serial.println("PubNub set up");

  pinMode(ledPin, OUTPUT); // set up LED pin as an output

}

void loop() {
  
  SubscribetoPubNub(); // receive the incoming messages from your channel
  
  delay(200); // wait a moment to avoid a build up of messages

  if (messageText == 255) { // if the incoming message is "255", set the LED to HIGH
    digitalWrite(ledPin, HIGH);
  } else { // else the incoming message is "0", set the LED to LOW
    digitalWrite(ledPin, LOW);
  }

}

void SubscribetoPubNub() {

  String val; // String for printing out the incoming message
  
  PubSubClient* sclient = PubNub.subscribe(channel); // subscribe to the channel defined at the top of the code
  
  SubscribeCracker ritz(sclient); // This "cracker" retrieves the incoming messages and holds onto the value
  
  while (!ritz.finished()) { // when the message is retrieved
    ritz.get(val); // get the value of the message as a string 
    if (val.length() > 0) { // make sure there is a value 
      Serial.print("Received: "); // print out the message
      Serial.println(val); // entire string of json
      printMessage(val); // call printMessage function (this allows us to use the incoming data outside of this function)
    }
  }

  sclient->stop();
}

void printMessage(String v) {
  doc.clear(); // clearing the last message

  deserializeJson(doc, v); // parse the JSON received

  sender = doc["sender"]; // the name of who is sending the data

  messageText = doc["messageText"]; // the message that is being sent

  /**NOTE: When parsing through the JSON, you must declaure the individual values in doc[""] as the same JSON as what is being sent from the web page **/

  // print out results
  Serial.print("sender: ");
  Serial.println(sender);
  Serial.print("messageText: ");
  Serial.println(messageText);

}
