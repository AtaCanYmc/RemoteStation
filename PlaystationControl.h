#ifndef PlaystationControl_h
#define PlaystationControl_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>
#include "NumericControl.h"

// MOVEMENTS
#define PS_LEFT LEFT
#define PS_RIGHT RIGHT
#define PS_UP UP
#define PS_DOWN DOWN

// BUTTONS
#define PS_X OK
#define PS_O EXIT
#define PS_O_2 LANG
#define PS_OPT OPT
#define PS_MENU MENU
#define PS_SHARE INFO

// HOLD BUTTONS
#define PS_HOLD_MENU FAV
#define PS_HOLD_RIGHT FAST_FORWARD
#define PS_HOLD_LEFT REWIND

class PlaystationControl {

public:
  NumericControl nc;
  PlaystationControl();
  void controlSignal(uint32_t IRsignal);

private:
  uint32_t lastIR = 0x0;
  void saveIR(uint32_t IRsignal);
  void sendHID(uint32_t settings[3]);

  void pressLeft();
  void pressRight();
  void pressUp();
  void pressDown();

  void pressX();
  void pressO();
  void pressO2();
  void pressOpt();
  void pressMenu();
  void pressShare();

  void holdMenu();
  void holdForward();
  void holdBackward();
};

#endif
