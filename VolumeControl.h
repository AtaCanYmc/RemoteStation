#ifndef VolumeControl_h
#define VolumeControl_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>

class VolumeControl {

public:
  VolumeControl();
  void controlSignal(uint32_t signal);
private:
  void pressVolButton(uint8_t keyButton, String def);
};

#endif
