#include <LiquidCrystal.h>
#include <Servo.h>

LiquidCrystal lcd(12 ,11 ,5 ,4 ,3 , 2);
Servo flagServo;

const int switchPin = 13;
const int flagPin = 9;
const int motorPin = 8;
const int flagAngle = 90;
const int messageNum = 3;
const int lineNum = 2;
String messages[messageNum][lineNum] = {
  { "Nice to meet you", "! I'm Bob!" },
  { "I want to dance", "with you" },
  { "I'm so happy to", "dance with you" }
};
int index = 0;
int prevIndex = 0;
const int interval = 5000;
unsigned long prevTime = 0;
enum State { NORMAL, WAITING, SHOWN, READ, ARCAHIVED };
State messageState = NORMAL;

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  flagServo.attach(flagPin);
  pinMode(switchPin, INPUT);
  pinMode(motorPin, OUTPUT);
  digitalWrite(motorPin, LOW);
}

void loop() {
  if (messageState == NORMAL) {
    unsigned long currentTime = millis();

    if(currentTime - prevTime > interval) {
      rotateFlag(true);
      messageState = WAITING;
    }
  } else if (messageState == WAITING) {
    if(digitalRead(switchPin) == HIGH){
      rotateFlag(false);

      delay(500);

      messageState = SHOWN;
    }
  } else if (messageState == SHOWN) {
    showMessage(index);
    digitalWrite(motorPin, HIGH);
    messageState = READ;
  } else if (messageState == READ) {
    if(digitalRead(switchPin) == HIGH){
      if(index == messageNum - 1) { index = 0; }
      else { index++; }

      delay(500);

      messageState = ARCAHIVED;
    }

    if(index != prevIndex) { showMessage(index); }

    prevIndex = index;
  } else if (messageState == ARCAHIVED) {
    digitalWrite(motorPin, LOW);
    lcd.clear();
    prevTime = millis();

    messageState = NORMAL;
  }
}

void showMessage(int index) {
  lcd.clear();

  for(int i = 0; i < lineNum; i++) {
    lcd.setCursor(0, i);
    lcd.print(messages[index][i]);
  }
}

void rotateFlag(bool isUp) {
  int direction;

  if(isUp) { direction = 1; }
  else { direction = -1; }

  for(int i = 1; i <= flagAngle; i++) {
    flagServo.write(i * direction);
    delay(10);
  }
}
