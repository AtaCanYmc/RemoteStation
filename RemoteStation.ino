#include <Keyboard.h>
#include <IRremote.h>
#include "PlaystationControl.h"

int RECV_PIN = 2;
int RECV_EN = 3;
IRrecv irrecv(RECV_PIN);
decode_results results;

PlaystationControl ps;

void setup() {
  Serial.begin(9600);
  Keyboard.begin();
  irrecv.enableIRIn();
  pinMode(RECV_EN, OUTPUT);
  digitalWrite(RECV_EN, HIGH);
}

void loop() {
  if (irrecv.decode(& results)) {
    Serial.print("IR Signal: ");
    Serial.println(results.value, HEX);
    ps.controlSignal(results.value);
    irrecv.resume();
  }
}
