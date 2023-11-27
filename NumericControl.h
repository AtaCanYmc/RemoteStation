#ifndef NumericControl_h
#define NumericControl_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>
#include "VolumeControl.h"

class NumericControl {

public:
  VolumeControl vc;
  NumericControl();
  void controlSignal(uint32_t signal);

private:
  void pressNum(char num);
};

#endif
