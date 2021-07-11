import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StringInputComponent } from './string-input.component';

@NgModule({
  declarations: [
    StringInputComponent
  ],
  exports: [
    StringInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StringInputModule {
}
