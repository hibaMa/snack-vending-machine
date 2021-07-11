import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineService } from './vending-machine.service';

@NgModule({
  providers: [
    VendingMachineService
  ],
  imports: [
    CommonModule
  ]
})
export class VendingMachineModule {
}
