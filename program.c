#include <Servo.h>

const int trigPin = 11;
const int echoPin = 12;
const int buzzerPin = 8;
const int greenLed = 2;
const int redLed = 3;   
Servo myServo;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(greenLed, OUTPUT);
  pinMode(redLed, OUTPUT); 
  
  Serial.begin(9600); 
  myServo.attach(9);
}

void loop() {
  for(int i = 30; i <= 160; i++){ scan(i); }
  for(int i = 160; i >= 30; i--){ scan(i); }
}

void scan(int angle) {
  myServo.write(angle);
  delay(30); 
  
  int distance = getDistance();
  
  if (distance < 55 && distance > 0) {
    digitalWrite(greenLed, LOW); 
    digitalWrite(redLed, HIGH);  
    digitalWrite(buzzerPin, HIGH);
    delay(10); 
    digitalWrite(buzzerPin, LOW);
  } else {
    digitalWrite(greenLed, HIGH); 
    digitalWrite(redLed, LOW);   
    digitalWrite(buzzerPin, LOW);
  }

  Serial.print(angle);
  Serial.print(",");
  Serial.println(distance);
}

int getDistance() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH, 40000); 
  int d = duration * 0.034 / 2;
  
  if (d > 60 || d <= 0) return 60; 
  return d;
}