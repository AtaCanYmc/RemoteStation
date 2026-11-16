#include <Arduino.h>
#include <Keyboard.h>
#include <IRremote.h>
#include "PlaystationControl.h"

const int RECV_PIN = 2;
const int RECV_EN = 3;
IRrecv irrecv(RECV_PIN);
decode_results results;

PlaystationControl ps;

void setup() {
  Serial.begin(9600);

  // Power and stabilize IR receiver before enabling interrupts
  pinMode(RECV_EN, OUTPUT);
  digitalWrite(RECV_EN, HIGH);
  delay(10);

  Keyboard.begin();
  irrecv.enableIRIn();
}

void loop() {
  if (irrecv.decode(&results)) {
    Serial.println(results.value, HEX);
    ps.controlSignal(results.value);
    irrecv.resume();
  }
}
