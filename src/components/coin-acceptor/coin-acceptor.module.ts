import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoinAcceptorComponent } from './coin-acceptor.component';
import { ButtonModule } from '../../shared/button/button.module';
import { ButtonGroupModule } from '../../shared/button-group/button-group.module';



@NgModule({
  declarations: [
    CoinAcceptorComponent
  ],
  exports: [
    CoinAcceptorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    ButtonGroupModule
  ]
})
export class CoinAcceptorModule { }
