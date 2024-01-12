#include "PlaystationControl.h"

PlaystationControl::PlaystationControl(){

}

void PlaystationControl::controlSignal(uint32_t IRsignal) {
    if(IRsignal == HOLD){ // Hold
      IRsignal = this->lastIR;
    }
    else if(IRsignal == RADIO_TV){
      saveIR(IRsignal);
      return;
    }

    if(this->lastIR == RADIO_TV && IRsignal != RADIO_TV){ // Change mode
      mapper.setMode(IRsignal);
      saveIR(IRsignal);
      return;
    }

    IR2HID HIDobject = mapper.searchIR(IRsignal);
    if(HIDobject.mode == "null"){
      saveIR(0x0);
      return;
    }

    sendHID(HIDobject.HIDsignal, HIDobject.HIDtime);
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





