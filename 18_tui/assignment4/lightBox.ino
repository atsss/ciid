#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h> // Required for 16 MHz Adafruit Trinket
#endif
#include <WiFiNINA.h>
#define PubNub_BASE_CLIENT WiFiClient
#include <PubNub.h>
#include <ArduinoJson.h>

// Which pin on the Arduino is connected to the NeoPixels?
// On a Trinket or Gemma we suggest changing this to 1:
#define LED_PIN 5

// How many NeoPixels are attached to the Arduino?
#define LED_COUNT  16

// NeoPixel brightness, 0 (min) to 255 (max)
#define BRIGHTNESS 50

// Declare our NeoPixel strip object:
Adafruit_NeoPixel strip(LED_COUNT, LED_PIN, NEO_GRBW + NEO_KHZ800);

char ssid[] = "CIID Lab";
//password of your WPA Network
char pass[] = "buildtestrepeat";

char pubkey[] = "pub-c-68aa7c10-55da-46ab-b985-b043f48e2899";
char subkey[] = "sub-c-c4dd0922-f951-11ea-8ff3-ca9fd24ed40e";

int status = WL_IDLE_STATUS;

const static char channel[] = "time-off-device"; // channel to use

StaticJsonDocument<200> doc; // JSON object for receiving the incoming values

const char* sender;
int value;
int const switchPin = A6;

int pinNum = 0;
int const onePinDurationSec= 5;

void setup() {
  // These lines are specifically to support the Adafruit Trinket 5V 16 MHz.
  // Any other board, you can remove this part (but no harm leaving it):
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
#endif

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

  pinMode(switchPin,INPUT);

  // END of Trinket-specific code.
  strip.begin();           // INITIALIZE NeoPixel strip object (REQUIRED)
  strip.show();            // Turn OFF all pixels ASAP
  strip.setBrightness(50); // Set BRIGHTNESS to about 1/5 (max = 255)
}

void loop() {
  //variable of the switch
  int switchState = digitalRead(switchPin);

  //if the switch is on, then connect to WIFI
  if (switchState == LOW) {
//    Serial.println("Switch is off");
  } else {
    Serial.println("Switch is on");
    SubscribetoPubNub(); // receive the incoming messages from your channel
    delay(200); // wait a moment to avoid a build up of messages
    Serial.println("Got message");
  }

  if (pinNum == 0) strip.clear();

  colorWipe(strip.Color(100, 80, 40, 100), 50, pinNum); // True white (not RGB white)
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

  value = doc["value"]; // the message that is being sent
  pinNum = (value / onePinDurationSec) % 16;
  Serial.println(value / onePinDurationSec);

  /**NOTE: When parsing through the JSON, you must declaure the individual values in doc[""] as the same JSON as what is being sent from the web page **/

  // print out results
  Serial.print("sender: ");
  Serial.println(sender);
  Serial.print("value: ");
  Serial.println(value);
}

void colorWipe(uint32_t color, int wait, int num) {
  for(int i=0; i<num; i++) { // For each pixel in strip...
    strip.setPixelColor(i, color);         //  Set pixel's color (in RAM)
    strip.show();                          //  Update strip to match
    delay(wait);                           //  Pause for a moment
  }
}
