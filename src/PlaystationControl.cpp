#include "PlaystationControl.h"

PlaystationControl::PlaystationControl(){

}

void PlaystationControl::controlSignal(uint32_t IRsignal) {
    if(IRsignal == HOLD){ // Hold
      IRsignal = lastIR;
    }
    else if(lastIR == RADIO_TV){ // Change mode
      mapper.setMode(IRsignal);
      return;
    }

    IR2HID HIDobject = mapper.searchIR(IRsignal);
    if(HIDobject.mode == "null"){
      return;
    }

    sendHID(HIDobject.HIDsignal, HIDobject.HIDtime);
    //Serial.println(HIDobject.HIDsignal);
    saveIR(IRsignal);
}

void PlaystationControl::saveIR(uint32_t IRsignal){
  if(IRsignal != HOLD){
    lastIR = IRsignal;
  }
}

void PlaystationControl::sendHID(uint32_t signal, uint32_t time){
  Keyboard.press(signal);
  delay(time);
  Keyboard.releaseAll();
}





