#include "PlaystationControl.h"

PlaystationControl::PlaystationControl(){

}

void PlaystationControl::controlSignal(uint32_t IRsignal) {
    if(IRsignal == HOLD){
      IRsignal = lastIR;
    }
    else if(IRsignal == RADIO_TV){
      return;
    }
    sendHID(IRtoHID(IRsignal));
    saveIR(IRsignal);
}

void PlaystationControl::saveIR(uint32_t IRsignal){
  if(IRsignal != HOLD){
    lastIR = IRsignal;
  }
}

void PlaystationControl::sendHID(uint32_t settings[3]){
  Keyboard.press(settings[0]);
  delay(settings[1]);
  if(settings[2] > 0){
    Keyboard.releaseAll();
  }
}

uint32_t* PlaystationControl::IRtoHID(uint32_t IRsignal){
  uint32_t* HID; 

  switch (IRsignal) {
    // Arrow buttons
    case PS_UP: {
      HID = new uint32_t[3]{KEY_UP_ARROW, 50, 1};
      break;
    }
    case PS_DOWN: {
      HID = new uint32_t[3]{KEY_DOWN_ARROW, 50, 1};
      break;
    }
    case PS_LEFT: {
      HID = new uint32_t[3]{KEY_LEFT_ARROW, 50, 1};
      break;
    }
    case PS_RIGHT: {
      HID = new uint32_t[3]{KEY_RIGHT_ARROW, 50, 1};
      break;
    }
    // Clickable
    case PS_X: {
      HID = new uint32_t[3]{KEY_KP_ENTER, 50, 1};
      break;
    }
    case PS_O: {
      HID = new uint32_t[3]{0x08, 50, 1}; //backspace
      break;
    }
    case PS_O_2: {
      HID = new uint32_t[3]{KEY_ESC, 50, 1}; // ESC
      break;
    }
    case PS_MENU: {
      HID = new uint32_t[3]{KEY_PAUSE, 50, 1};
      break;
    }      
    case PS_OPT: {
      HID = new uint32_t[3]{KEY_F3, 50, 1};
      break;
    }  
    case PS_SHARE: {
      HID = new uint32_t[3]{KEY_PRINT_SCREEN, 50, 1};
      break;
    }    
    // Hold buttons
    case PS_HOLD_MENU: {
      HID = new uint32_t[3]{KEY_PAUSE, 1000, 1};
      break;
    }      
  }

  return HID;
}

/*
void PlaystationControl::pressLeft() {
  Serial.println("Pressed on left");
  Keyboard.press(KEY_LEFT_ARROW);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressRight() {
  Serial.println("Pressed on right");
  Keyboard.press(KEY_RIGHT_ARROW);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressDown() {
  Serial.println("Pressed on down");
  Keyboard.press(KEY_DOWN_ARROW);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressUp() {
  Serial.println("Pressed on up");
  Keyboard.press(KEY_UP_ARROW);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressX() {
  Serial.println("Pressed on X");
  Keyboard.press(KEY_KP_ENTER);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressO() {
  Serial.println("Pressed on O");
  Keyboard.press(0x08); //Backspace
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressO2() {
  Serial.println("Pressed on O");
  Keyboard.press(KEY_ESC);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressOpt() {
  Serial.println("Pressed on options");
  Keyboard.press(KEY_F3);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressMenu() {
  Serial.println("Pressed on menu");
  Keyboard.press(KEY_PAUSE);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::pressShare() {
  Serial.println("Pressed on share");
  Keyboard.press(KEY_PRINT_SCREEN);
  delay(100);
  Keyboard.releaseAll();
}

void PlaystationControl::holdMenu() {
  Serial.println("Pressed on hold menu");
  Keyboard.press(KEY_PAUSE);
  delay(1000);
  Keyboard.releaseAll();
}

void PlaystationControl::holdForward() {
  Serial.println("Pressed on forward");
  Keyboard.press(KEY_RIGHT_ARROW);
  delay(1200);
  Keyboard.releaseAll();
}

void PlaystationControl::holdBackward() {
  Serial.println("Pressed on backward");
  Keyboard.press(KEY_LEFT_ARROW);
  delay(1200);
  Keyboard.releaseAll();
}
*/





