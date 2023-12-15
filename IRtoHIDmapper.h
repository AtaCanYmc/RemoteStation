#ifndef IRtoHIDmapper_h
#define IRtoHIDmapper_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>

struct IR2HID {
  uint32_t IRsignal;
  uint32_t HIDsignal;
  String mode;

  IR2HID(uint32_t IR=0, uint32_t HID=0, String m="PS4") : IRsignal(IRsignal), HIDsignal(HID), mode(m) {}
};

class IRtoHIDmapper {
public:
  IRtoHIDmapper();
  void searchIR(uint32_t signal);
private:
  
};

#endif
