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
#define PS_SHARE FAV

// HOLD BUTTONS
#define PS_HOLD_MENU ON_OFF

struct IR2HID {
  uint32_t IRsignal;
  uint32_t HIDsignal;
  String mode;

  IR2HID(uint32_t IR=0, uint32_t HID=0, String m="PS4") : IRsignal(IRsignal), HIDsignal(HID), mode(m) {}
};

class PlaystationControl {

public:
  NumericControl nc;
  PlaystationControl();
  void controlSignal(uint32_t IRsignal);

private:
  String modes[4] = {"Youtube", "Disney+", "Spotify", "Netflix"};
  String currentMode = modes[0];
  uint32_t lastIR = 0x0;
  IR2HID test{0,0,""};
  void saveIR(uint32_t IRsignal);
  void sendHID(uint32_t settings[3]);
  uint32_t* IRtoHID(uint32_t IRsignal);
};

#endif
