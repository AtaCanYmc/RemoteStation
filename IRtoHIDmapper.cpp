#include "IRtoHIDmapper.h"

IRtoHIDmapper::IRtoHIDmapper(){

}

IR2HID IRtoHIDmapper::searchIR(uint32_t signal){
  for(int i=0; i<(sizeof(buttons) / sizeof(buttons[0])); i++){
    if(buttons[i].IRsignal == signal){ // && (buttons[i].mode == "PS4" || buttons[i].mode == currentMode)
      return buttons[i];
    }
  }
  return {0,0,0,"null"};
}

void IRtoHIDmapper::setMode(uint32_t signal){
  switch(signal) {
    case NUM_1: {
      currentMode = modes[0];
      break;
    }
    case NUM_2: {
      currentMode = modes[1];
      break;
    }
    case NUM_3: {
      currentMode = modes[2];
      break;
    }
    default:{
      currentMode = modes[0];
    }
  }
  Serial.print("currentMode: ");
  Serial.println(currentMode);
}




