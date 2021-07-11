import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemSlotComponent } from './item-slot.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ItemSlotComponent
  ],
  exports: [
    ItemSlotComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ]
})
export class ItemSlotModule { }
