// define pins
const int pinAdc = A0;
const int pinLed = 2;

// for sound sensor
const int activateCount = 2;
const float knockActivateSound = 2.5;
const float voiceActivateSound = 2.5;

// define states
enum State { WATCHING, WAITING, LISTENING, PLAYING };
State state = WATCHING;

// durations for each state
const int waitingDuration = 10000; // [msec] => 10 [sec]
const int listeningDuration = 10000; // [msec] => 10 [sec]
long startWaitingTime = 0;
long startListeningTime = 0;

// variables for knock and upe
const int knockDuration = 1000; // [msec] => 1 [sec]
const int voiceDuration = 3000; // [msec] => 3 [sec]
const int bounceDelay = 240;
int knockCount = 0;
long lastKnockTime = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("I'm ready");

  pinMode(pinLed, OUTPUT);
}

void loop() {
  long currentTime = millis();
  float result = analogRead(pinAdc) / 1024.0 * 3.3;

  switch(state) {
    case WATCHING:
      // motion sensor code block
      Serial.println("I'm WATCHING");
      startWaitingTime = currentTime;
      state = WAITING;
      break;
    case WAITING:
      // Serial.println("I'm WAITING");

      if (result > knockActivateSound) {
        if (knockCount == 0) {
          Serial.println("Hey 1");
          knockCount++;
        } else if (knockCount < activateCount && currentTime - lastKnockTime < knockDuration) {
          Serial.println("Hey 2");
          knockCount++;
        } else if (knockCount >= activateCount && currentTime - lastKnockTime < knockDuration) {
          Serial.println("Hey 3");
          knockCount = 0;
          startListeningTime = currentTime;
          state = LISTENING;
        }

        Serial.println(result);
        delay(bounceDelay);
        lastKnockTime = currentTime;
      }

      if (currentTime - startWaitingTime > waitingDuration) state = WATCHING;
      break;
    case LISTENING:
      Serial.println("I'm LISTENING");
      if (result > voiceActivateSound) state = PLAYING;
      if (currentTime - startListeningTime > listeningDuration) state = WATCHING;
      break;
    case PLAYING:
      Serial.println("I'm PLAYING");

      // send message to p5.js
      // send message to twitter every 5 people come
      digitalWrite(pinLed, HIGH);
      delay(2000);
      digitalWrite(pinLed, LOW);
      state = WATCHING;

      break;
  }
}
