#include "NumericControl.h"

NumericControl::NumericControl(){

}

void NumericControl::controlSignal(uint32_t signal) {
    switch (signal) {
        case NUM_0: {
          pressNum('0');
          break;
        }
        case NUM_1: {
          pressNum('1');
          break;
        }
        case NUM_2: {
          pressNum('2');
          break;
        }
        case NUM_3: {
          pressNum('3');
          break;
        }
        case NUM_4: {
          pressNum('4');
          break;
        }
        case NUM_5: {
          pressNum('5');
          break;
        }
        case NUM_6: {
          pressNum('6');
          break;
        }      
        case NUM_7: {
          pressNum('7');
          break;
        }  
        case NUM_8: {
          pressNum('8');
          break;
        }    
        case NUM_9: {
          pressNum('9');
          break;
        }      
        // Check Volume
        default: {
          vc.controlSignal(signal);
        }
    }
}

void NumericControl::pressNum(char num){
  Serial.print("Pressed on ");
  Serial.println(num);
  Keyboard.write(num);
  delay(100);
  Keyboard.releaseAll();
}



