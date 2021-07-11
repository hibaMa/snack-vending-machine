import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillAcceptorComponent } from './bill-acceptor.component';
import { ButtonModule } from '../../shared/button/button.module';
import { ButtonGroupModule } from '../../shared/button-group/button-group.module';



@NgModule({
  declarations: [
    BillAcceptorComponent
  ],
  exports: [
    BillAcceptorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonGroupModule
  ]
})
export class BillAcceptorModule { }
