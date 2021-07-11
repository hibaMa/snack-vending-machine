import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsViewComponent } from './items-view.component';
import { ItemSlotModule } from '../item-slot/item-slot.module';

@NgModule({
  declarations: [
    ItemsViewComponent
  ],
  exports: [
    ItemsViewComponent
  ],
  imports: [
    CommonModule,
    ItemSlotModule
  ]
})
export class ItemsViewModule { }
