import { Directive } from '@angular/core';
import { VendingMachineItem } from '../../services/vending-machine/vending-machine.service';
import { VendingStatus } from './vending-status';

export const VendingStatusMap = {
  [VendingStatus.Initial]: 'Initial',
  [VendingStatus.EnteringPosition]: 'EnteringPosition',
  [VendingStatus.DoingPayment]: 'DoingPayment',
  [VendingStatus.ProcessingPayment]: 'ProcessingPayment',
  [VendingStatus.DispenseItem]: 'DispenseItem',
};

export enum ValidationErrorKey {
  InvalidPosition = 'InvalidPosition',
  ItemOutOfStock = 'ItemOutOfStock',
  InvalidCardNumber = 'InvalidCardNumber',
  NotEnoughMoneyInCard = 'NotEnoughMoneyInCard',
  NotEnoughChangeInMachine = 'NotEnoughChangeInMachine'
}

@Directive()
export abstract class BasicVendingMachineComponent {
  _currentStatus: VendingStatus;
  items: VendingMachineItem[];
  selectedItem: VendingMachineItem;
  VendingStatusMap = VendingStatusMap;

  protected abstract reset(): void;

  private timeout;

  set currentStatus(val) {
    // these require user interaction
    if (val === VendingStatus.DoingPayment || val === VendingStatus.EnteringPosition) {
      this.clearTimeOut();
      this.setTimeOutToRestart();
    } else {
      this.clearTimeOut();
    }
    this._currentStatus = val;
  }

  get currentStatus() {
    return this._currentStatus;
  }

  setTimeOutToRestart() {
    this.timeout = setTimeout(() => {
      this.reset();
    }, 20000);
  }

  clearTimeOut() {
    clearTimeout(this.timeout);
  }
}
