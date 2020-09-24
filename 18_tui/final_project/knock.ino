// define pins
const int pinAdc = A0;
const int pinLed = 2;
const int trigPin = 3;
const int echoPin = 4;

// for motion sensor
long duration;
int distance;
const int minDist = 0;
const int maxDist = 100;

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
  float result = analogRead(pinAdc) / 1024.0 * 5.0;

  switch(state) {
    case WATCHING:
      // Serial.println("I'm WATCHING");
      getDistance();

      if (distance >= minDist && distance <= maxDist){
        startWaitingTime = currentTime;
        state = WAITING;
      }
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

void getDistance() {
  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);

  // Calculating the distance
  distance = duration*0.034/2;

  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
}
