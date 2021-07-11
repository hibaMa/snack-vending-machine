import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrorKey } from '../../views/vending-machine-view/basic-vending-machine-component';
import { VendingStatus } from '../../views/vending-machine-view/vending-status';

const ErrorMessagesMap = {
  [ValidationErrorKey.InvalidPosition]: 'you have entered invalid position please try again',
  [ValidationErrorKey.ItemOutOfStock]: 'sorry, you selected unavailable item',
  [ValidationErrorKey.InvalidCardNumber]: 'ERROR: invalid serial number please try again',
  [ValidationErrorKey.NotEnoughMoneyInCard]: 'ERROR: not enough money in card',
  [ValidationErrorKey.NotEnoughChangeInMachine]: 'ERROR: not enough money in machine'
};

@Pipe({
  name: 'getUserMessage'
})
export class GetUserMessagePipe implements PipeTransform {

  transform(vendingMachineStatus: VendingStatus, keypadVal: string, price: number, validationError: ValidationErrorKey, totalSumOfMoneyInsertedByUserInCent: number): string {
    let msg = '';
    switch (vendingMachineStatus) {
      case VendingStatus.Initial:
        msg = 'Please enter Snack position then click OK';
        break;
      case VendingStatus.EnteringPosition:
        msg = 'click ok on done \n' + 'POSITION: ' + keypadVal;
        break;
      case VendingStatus.DoingPayment:
        msg = 'Selected item price: ' + price + '\n please scan card(click on Done) or insert coins/cash'
          + '\n entered amount: ' + totalSumOfMoneyInsertedByUserInCent;
        break;
      case VendingStatus.ProcessingPayment:
        msg = 'Thanks! your payment is being processed';
        break;
      case VendingStatus.DispenseItem:
        msg = 'Enjoy your snack';
        break;
    }
    return validationError ? ErrorMessagesMap[validationError] + '\n' + msg : msg;
  }

}
