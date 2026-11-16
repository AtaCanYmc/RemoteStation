#ifndef PlaystationControl_h
#define PlaystationControl_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>
#include "IRtoHIDmapper.h"

class PlaystationControl {
public:
  IRtoHIDmapper mapper;
  PlaystationControl();
  void controlSignal(uint32_t IRsignal);

private:
  uint32_t lastIR = 0x0;
  void saveIR(uint32_t IRsignal);
  void sendHID(uint8_t signal, uint16_t time);
};

#endif
