#include "PlaystationControl.h"

PlaystationControl::PlaystationControl(){

}

void PlaystationControl::controlSignal(uint32_t IRsignal) {
    switch (IRsignal) {
        // Arrow buttons
        case PS_UP: {
          pressUp();
          break;
        }
        case PS_DOWN: {
          pressDown();
          break;
        }
        case PS_LEFT: {
          //pressLeft();
          uint32_t HID[] = {KEY_LEFT_ARROW, 10, 1};
          sendHID(HID);
          break;
        }
        case PS_RIGHT: {
          pressRight();
          break;
        }
        // Clickable
        case PS_X: {
          pressX();
          break;
        }
        case PS_O: {
          pressO();
          break;
        }
        case PS_O_2: {
          pressO2();
          break;
        }
        case PS_MENU: {
          pressMenu();
          break;
        }      
        case PS_OPT: {
          pressOpt();
          break;
        }  
        case PS_SHARE: {
          pressShare();
          break;
        }    
        // Hold buttons
        case PS_HOLD_MENU: {
          holdMenu();
          break;
        }      
        case PS_HOLD_RIGHT: {
          holdForward();
          break;
        }  
        case PS_HOLD_LEFT: {
          holdBackward();
          break;
        }
        case HOLD: {
          controlSignal(lastIR);
          break;
        }
        // Check for numeric
        default: {
          nc.controlSignal(IRsignal);
        }
    }
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






