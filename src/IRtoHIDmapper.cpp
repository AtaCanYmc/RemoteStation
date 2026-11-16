#include "IRtoHIDmapper.h"

const IR2HID IRtoHIDmapper::buttons[33] = {
  // Movement(4)
  {UP, KEY_UP_ARROW, 50, MODE_PS4, true},
  {DOWN, KEY_DOWN_ARROW, 50, MODE_PS4, true},
  {LEFT, KEY_LEFT_ARROW, 50, MODE_PS4, true},
  {RIGHT, KEY_RIGHT_ARROW, 50, MODE_PS4, true},

  // General(7)
  {OK, KEY_KP_ENTER, 50, MODE_PS4, true},
  {EXIT, 0x08, 50, MODE_PS4, true},
  {LANG, KEY_ESC, 50, MODE_PS4, true},
  {MENU, KEY_PAUSE, 50, MODE_PS4, true},
  {FAV, KEY_PRINT_SCREEN, 50, MODE_PS4, true},
  {OPT, KEY_F3, 50, MODE_PS4, true},
  {ON_OFF, KEY_PAUSE, 1000, MODE_PS4, true},

  // Numpad(10)
  {NUM_0, '0', 50, MODE_PS4, true},
  {NUM_1, '1', 50, MODE_PS4, true},
  {NUM_2, '2', 50, MODE_PS4, true},
  {NUM_3, '3', 50, MODE_PS4, true},
  {NUM_4, '4', 50, MODE_PS4, true},
  {NUM_5, '5', 50, MODE_PS4, true},
  {NUM_6, '6', 50, MODE_PS4, true},
  {NUM_7, '7', 50, MODE_PS4, true},
  {NUM_8, '8', 50, MODE_PS4, true},
  {NUM_9, '9', 50, MODE_PS4, true},

  // Youtube Shortcuts(7)
  {MUTE, 'M', 50, MODE_YOUTUBE, true},
  {PREV, KEY_F4, 50, MODE_YOUTUBE, true},
  {NEXT, KEY_F5, 50, MODE_YOUTUBE, true},
  {REWIND, 'J', 50, MODE_YOUTUBE, true},
  {FAST_FORWARD, 'L', 50, MODE_YOUTUBE, true},
  {PLAY, 0x20, 50, MODE_YOUTUBE, true},
  {INFO, 'S', 50, MODE_YOUTUBE, true},

  // Disney+ Shortcuts(3)
  {MUTE, 'M', 50, MODE_DISNEY, true},
  {REWIND, 'O', 50, MODE_DISNEY, true},
  {FAST_FORWARD, 'P', 50, MODE_DISNEY, true},

  // PS4 Browser(2)
  {INFO, KEY_F1, 50, MODE_BROWSER, true},
  {SUBT, KEY_F2, 50, MODE_BROWSER, true}
};

IRtoHIDmapper::IRtoHIDmapper() {
}

IR2HID IRtoHIDmapper::searchIR(uint32_t signal) {
  for (size_t i = 0; i < (sizeof(buttons) / sizeof(buttons[0])); i++) {
    if (buttons[i].IRsignal == signal && (buttons[i].mode == MODE_PS4 || buttons[i].mode == currentMode)) {
      return buttons[i];
    }
  }
  return {0, 0, 0, MODE_PS4, false};
}

void IRtoHIDmapper::setMode(uint32_t signal) {
  switch (signal) {
    case NUM_1:
      currentMode = MODE_YOUTUBE;
      break;
    case NUM_2:
      currentMode = MODE_DISNEY;
      break;
    case NUM_3:
      currentMode = MODE_BROWSER;
      break;
    default:
      currentMode = MODE_YOUTUBE;
      break;
  }
}

AppMode IRtoHIDmapper::getMode() const {
  return currentMode;
}
