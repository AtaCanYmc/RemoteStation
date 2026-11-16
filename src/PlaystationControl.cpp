#include "PlaystationControl.h"

PlaystationControl::PlaystationControl() : lastIR(0) {
}

void PlaystationControl::controlSignal(uint32_t IRsignal) {
  if (IRsignal == 0) {
    return;
  }

  // Handle NEC repeat / hold frame
  if (IRsignal == HOLD) {
    IRsignal = lastIR;
  } else if (lastIR == RADIO_TV) {
    // Mode selection following RADIO_TV trigger
    mapper.setMode(IRsignal);
    lastIR = 0;
    return;
  }

  // Intercept mode change initiator
  if (IRsignal == RADIO_TV) {
    lastIR = RADIO_TV;
    return;
  }

  IR2HID HIDobject = mapper.searchIR(IRsignal);
  if (!HIDobject.valid) {
    return;
  }

  sendHID(HIDobject.HIDsignal, HIDobject.HIDtime);
  saveIR(IRsignal);
}

void PlaystationControl::saveIR(uint32_t IRsignal) {
  if (IRsignal != HOLD) {
    lastIR = IRsignal;
  }
}

void PlaystationControl::sendHID(uint8_t signal, uint16_t time) {
  if (signal == 0) {
    return;
  }
  // Clamp hold time to 2000ms max to prevent unbounded blocking or stuck keys
  if (time > 2000) {
    time = 2000;
  }

  Keyboard.press(signal);
  delay(time);
  Keyboard.releaseAll();
}
