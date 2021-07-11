import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeypadComponent } from './keypad.component';



@NgModule({
  declarations: [
    KeypadComponent
  ],
  exports: [
    KeypadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KeypadModule { }
