#ifndef IRtoHIDmapper_h
#define IRtoHIDmapper_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>

enum AppMode : uint8_t {
  MODE_PS4 = 0,
  MODE_YOUTUBE,
  MODE_DISNEY,
  MODE_BROWSER,
  MODE_NETFLIX
};

struct IR2HID {
  uint32_t IRsignal;
  uint8_t HIDsignal;
  uint16_t HIDtime;
  AppMode mode;
  bool valid;
};

class IRtoHIDmapper {
public:
  IRtoHIDmapper();
  IR2HID searchIR(uint32_t signal);
  void setMode(uint32_t signal);
  AppMode getMode() const;

private:
  AppMode currentMode = MODE_YOUTUBE;
  static const IR2HID buttons[38];
};

#endif
