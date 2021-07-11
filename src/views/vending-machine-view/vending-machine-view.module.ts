import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineViewComponent } from './vending-machine-view.component';
import { DisplayModule } from '../../components/display/display.module';
import { KeypadModule } from '../../components/keypad/keypad.module';
import { BillAcceptorModule } from '../../components/bill-acceptor/bill-acceptor.module';
import { CardReaderModule } from '../../components/card-reader/card-reader.module';
import { CoinAcceptorModule } from '../../components/coin-acceptor/coin-acceptor.module';
import { ItemsViewModule } from '../../components/items-view/items-view.module';
import { ButtonModule } from '../../shared/button/button.module';
import { StringInputModule } from '../../shared/string-input/string-input.module';
import { ChangeFunctionModule } from '../../components/change-function/change-function.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { GetUserMessageModule } from '../../shared/get-user-message/get-user-message.module';

@NgModule({
  declarations: [
    VendingMachineViewComponent
  ],
  exports: [
    VendingMachineViewComponent
  ],
  imports: [
    CommonModule,
    DisplayModule,
    KeypadModule,
    BillAcceptorModule,
    CardReaderModule,
    CoinAcceptorModule,
    ItemsViewModule,
    ButtonModule,
    StringInputModule,
    ChangeFunctionModule,
    FontAwesomeModule,
    FormsModule,
    GetUserMessageModule
  ]
})
export class VendingMachineViewModule {
}
