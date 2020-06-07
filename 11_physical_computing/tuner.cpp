#include <Wire.h>
#include <Adafruit_GFX.h>
#include "Adafruit_LEDBackpack.h"

int const potPin = A0;
float potVal;
int angle;

Adafruit_8x8matrix matrix = Adafruit_8x8matrix();

void setup() {
  Serial.begin(9600);
  Serial.println("8x8 LED Matrix Test");

  pinMode(potPin, INPUT);
  matrix.begin(0x70);  // pass in the address
}

static const uint8_t PROGMEM
  happy_bmp[] =
  { B00000000,
    B01000010,
    B00100100,
    B01000010,
    B00000000,
    B00100100,
    B00011000,
    B00000000 },
  smile_bmp[] =
  { B00000000,
    B00000000,
    B00100100,
    B00000000,
    B00000000,
    B00100100,
    B00011000,
    B00000000 },
  neutral_bmp[] =
  { B00000000,
    B00000000,
    B00100100,
    B00000000,
    B00000000,
    B00111100,
    B00000000,
    B00000000 },
  frown_bmp[] =
  { B00000000,
    B00000000,
    B00100100,
    B00000000,
    B00000000,
    B00011000,
    B00100100,
    B00000000 };

void loop() {
  potVal = analogRead(potPin) * 5/3.3;

  float index = map(potVal, 0, 1023, 0, 4);
  Serial.print("potVal: ");
  Serial.println(potVal);
  Serial.print("index: ");
  Serial.println(index);

  if(index >= 3) {
    matrix.clear();
    matrix.drawBitmap(0, 0, happy_bmp, 8, 8, LED_ON);
    matrix.writeDisplay();
  } else if(index >= 2) {
    matrix.clear();
    matrix.drawBitmap(0, 0, smile_bmp, 8, 8, LED_ON);
    matrix.writeDisplay();
  } else if(index >= 1) {
    matrix.clear();
    matrix.drawBitmap(0, 0, neutral_bmp, 8, 8, LED_ON);
    matrix.writeDisplay();
  } else {
    matrix.clear();
    matrix.drawBitmap(0, 0, frown_bmp, 8, 8, LED_ON);
    matrix.writeDisplay();
  }
}
