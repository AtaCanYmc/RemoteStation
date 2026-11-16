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
  void sendHID(uint32_t signal, uint32_t time);
  uint32_t* IRtoHID(uint32_t IRsignal);
};

#endif
