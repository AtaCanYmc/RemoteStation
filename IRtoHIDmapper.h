#ifndef IRtoHIDmapper_h
#define IRtoHIDmapper_h

#include "RemoteHex.h"
#include <Arduino.h>
#include <Keyboard.h>

struct IR2HID {
  uint32_t IRsignal;
  uint32_t HIDsignal;
  uint32_t HIDtime;
  String mode;
};

class IRtoHIDmapper {

public:
  IRtoHIDmapper();
  IR2HID searchIR(uint32_t signal);
  void setMode(uint32_t signal);
private:
  String modes[3] = {"Youtube", "Disney+", "Browser"};
  String currentMode = "Youtube";

  IR2HID buttons[33] = {
    // Movement(4)
    {UP, KEY_UP_ARROW, 50, "PS4"},              // ⬆️
    {DOWN, KEY_DOWN_ARROW, 50, "PS4"},          // ⬇️
    {LEFT, KEY_LEFT_ARROW, 50, "PS4"},          // ⬅️
    {RIGHT, KEY_RIGHT_ARROW, 50, "PS4"},        // 👉🏻
    // General(7)
    {OK, KEY_RETURN, 50, "PS4"},                // 🅧
    {EXIT, 0x08, 50, "PS4"},                    // ⭕️ (Backspace)
    {LANG, KEY_ESC, 50, "PS4"},                 // ⭕️
    {MENU, KEY_PAUSE, 50, "PS4"},               // PS button 
    {FAV, KEY_PRINT_SCREEN, 50, "PS4"},         // Share button
    {OPT, KEY_F3, 50, "PS4"},                   // Options button
    {ON_OFF, KEY_PAUSE, 1000, "PS4"},           // PS button hold
    // Numpad(10)
    {NUM_0, '0', 50, "PS4"},                    // 0
    {NUM_1, '1', 50, "PS4"},                    // 1
    {NUM_2, '2', 50, "PS4"},                    // 2
    {NUM_3, '3', 50, "PS4"},                    // 3
    {NUM_4, '4', 50, "PS4"},                    // 4
    {NUM_5, '5', 50, "PS4"},                    // 5
    {NUM_6, '6', 50, "PS4"},                    // 6
    {NUM_7, '7', 50, "PS4"},                    // 7
    {NUM_8, '8', 50, "PS4"},                    // 8
    {NUM_9, '9', 50, "PS4"},                    // 9
    // Youtube Shortcuts(7)
    {MUTE, 'M', 50, "Youtube"},                 // Mute
    {PREV, KEY_F4, 50, "Youtube"},              // Previous video
    {NEXT, KEY_F5, 50, "Youtube"},              // Next video
    {REWIND, 'J', 50, "Youtube"},               // Rewind
    {FAST_FORWARD, 'L', 50, "Youtube"},         // Fast forward
    {PLAY, 0x20, 50, "Youtube"},                // Play / Pause (Space)
    {INFO, 'S', 50, "Youtube"},                 // Search
    // Disney+ Shortcuts(3)
    {MUTE, 'M', 50, "Disney+"},                 // Mute
    {REWIND, 'O', 50, "Disney+"},               // Rewind
    {FAST_FORWARD, 'P', 50, "Disney+"},         // Fast forward
    // PS4 Browser(2)
    {INFO, KEY_F1, 50, "Browser"},              // Search
    {SUBT, KEY_F2, 50, "Browser"}               // Full screen

    // Spotify(0)
    // Netflix(0)
    // Amazon(0)
  };



};

#endif
