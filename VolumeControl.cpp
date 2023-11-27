#include "VolumeControl.h"

VolumeControl::VolumeControl(){

}

void VolumeControl::controlSignal(uint32_t signal) {
    switch (signal) {
        case VOL_UP: {
          pressVolButton(0x80, "volume up");
          break;
        }
        case VOL_DOWN: {
          pressVolButton(0x81, "volume down");
          break;
        }
        case MUTE: {
          pressVolButton(0x7f, "mute");
          break;
        } 
    }
}

void VolumeControl::pressVolButton(uint8_t keyButton, String def){
  Serial.print("Pressed on ");
  Serial.println(def);
  Keyboard.write(keyButton);
  delay(100);
  Keyboard.releaseAll();
}



