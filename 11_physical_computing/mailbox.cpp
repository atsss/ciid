#include<LiquidCrystal.h>
LiquidCrystal lcd(12 ,11 ,5 ,4 ,3 , 2);
const int switchPin = 13;
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
enum State { NORMAL, WAITING, SHOWN, READ };
State messageState = NORMAL;

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  pinMode(switchPin, INPUT);
}

void loop() {
  if (messageState == NORMAL) {
    unsigned long currentTime = millis();

    if(currentTime - prevTime > interval) {
      // Sarvo-up code here

      messageState = WAITING;
    }
  } else if (messageState == WAITING) {
    showMessage(index);
    messageState = SHOWN;
  } else if (messageState == SHOWN) {
    if(digitalRead(switchPin) == HIGH){
      if(index == messageNum - 1) { index = 0; }
      else { index++; }

      delay(500);

      messageState = READ;
    }

    if(index != prevIndex) { showMessage(index); }

    prevIndex = index;
  } else if (messageState == READ) {
    lcd.clear();
    prevTime = millis();
    // Sarvo-down code here
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
