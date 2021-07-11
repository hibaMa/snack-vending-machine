import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardReaderComponent } from './card-reader.component';
import { StringInputModule } from '../../shared/string-input/string-input.module';
import { ButtonModule } from '../../shared/button/button.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardReaderComponent
  ],
  exports: [
    CardReaderComponent
  ],
  imports: [
    CommonModule,
    StringInputModule,
    ButtonModule,
    FormsModule
  ]
})
export class CardReaderModule { }
