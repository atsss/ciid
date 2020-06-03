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

void setup() {
  Serial.begin(9600);
  lcd.begin(16, 2);
  pinMode(switchPin, INPUT);

  showMessage(index);
}

void loop() {
  if(digitalRead(switchPin) == HIGH){
    if(index == messageNum - 1) { index = 0; }
    else { index++; }

    delay(500);
  }

  if(index != prevIndex) { showMessage(index); }

  prevIndex = index;
}

void showMessage(int index) {
  lcd.clear();

  for(int i = 0; i < lineNum; i++) {
    lcd.setCursor(0, i);
    lcd.print(messages[index][i]);
  }
}
