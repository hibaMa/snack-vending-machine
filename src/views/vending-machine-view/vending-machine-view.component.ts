import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PaymentMethode,
  PurchaseData,
  totalMoneySum,
  VendingMachineItem,
  VendingMachineService
} from '../../services/vending-machine/vending-machine.service';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { ActionKey } from '../../components/keypad/keypad.component';
import { BasicVendingMachineComponent, ValidationErrorKey } from './basic-vending-machine-component';
import { Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CardReaderComponent } from '../../components/card-reader/card-reader.component';
import { VendingStatus } from './vending-status';

@Component({
  selector: 'app-vending-machine-view',
  templateUrl: './vending-machine-view.component.html',
  styleUrls: ['./vending-machine-view.component.scss']
})
export class VendingMachineViewComponent extends BasicVendingMachineComponent implements OnInit {

  itemDropped = false;
  change: number;
  userChangeList = {};

  _keypadValue = '';
  isResetting = false;
  faApple = faAppleAlt;
  validationErrors: ValidationErrorKey;
  refreshItems$ = new Subject();
  moneyInsertedByUser = {};
  totalSumOfMoneyInsertedByUser = 0;

  @ViewChild(CardReaderComponent)
  public cardReader: CardReaderComponent;

  set keypadValue(val) {
    if (this.isResetting) {
      this._keypadValue = val;
      return;
    }
    if (this.currentStatus > VendingStatus.EnteringPosition) {
      return; // don't update position
    }
    if (val && this.currentStatus < VendingStatus.EnteringPosition) {
      // in initial state
      this.currentStatus = VendingStatus.EnteringPosition;
    }
    this._keypadValue = val;
  }

  get keypadValue() {
    return this._keypadValue;
  }

  constructor(private vendingMachineService: VendingMachineService) {
    super();
  }

  ngOnInit(): void {
    this.refreshItems$.pipe(
      startWith(''),
      switchMap(() => this.vendingMachineService.getItems())
    ).subscribe(val => this.items = val);
    this.reset();
  }

  keypadActionKeyClicked(action: ActionKey) {
    if (action === ActionKey.ok && this.currentStatus === VendingStatus.EnteringPosition) {
      if (this.isValidPosition(this.items, this.keypadValue)) {
        this.validationErrors = null;
        this.selectItemAfterValidatePos();
      } else {
        this.keypadValue = '';
        this.validationErrors = ValidationErrorKey.InvalidPosition;
      }
    } else if (action === ActionKey.exit && this.currentStatus < VendingStatus.ProcessingPayment) {
      this.reset();
    }
  }

  public isValidPosition(items: VendingMachineItem[], position) {
    return !!items.find(item => item.position === position);
  }

  selectItemAfterValidatePos() {
    this.selectedItem = this.items.find(item => item.position === this.keypadValue);
    if (this.selectedItem.availableInStock) {
      this.currentStatus = VendingStatus.DoingPayment;
    } else {
      this.selectedItem = null;
      this.keypadValue = '';
      this.validationErrors = ValidationErrorKey.ItemOutOfStock;
    }
  }

  onCreditCardScanned(creditCardNumber) {
    if (this.currentStatus === VendingStatus.DoingPayment) {
      this.executePayment({
        paymentMethode: PaymentMethode.CreditCard,
        item: this.selectedItem,
        creditCardNumber
      });
    }
  }

  executePayment(data: PurchaseData) {
    setTimeout(() => {
      this.validationErrors = null;
      this.currentStatus = VendingStatus.ProcessingPayment;
      return this.vendingMachineService.purchase(data).subscribe(val => {
        this.refreshItems$.next();
        this.dispenseItem();
        if (val.changeList) {
          this.change = val.userChange;
          this.userChangeList = val.changeList;
        }
      }, error => {
        this.currentStatus = VendingStatus.DoingPayment;
        this.validationErrors = error;
        this.change = totalMoneySum(data.moneyMapAmount);
        this.moneyInsertedByUser = {};
        this.totalSumOfMoneyInsertedByUser = 0;
      });
    }, 200);

  }

  onMoneyAdded(money) {
    if (this.currentStatus === VendingStatus.DoingPayment) {
      this.moneyInsertedByUser[money] = (money in this.moneyInsertedByUser) ? this.moneyInsertedByUser[money] + 1 : 1;

      this.totalSumOfMoneyInsertedByUser = this.totalSumOfMoneyInsertedByUser + money;
      if (this.totalSumOfMoneyInsertedByUser >= this.selectedItem.price) {
        this.executePayment({
          item: this.selectedItem,
          paymentMethode: PaymentMethode.Cash,
          moneyMapAmount: this.moneyInsertedByUser
        });
      }
    } else {
      // if insert money while not in DoingPayment state return them to user
      this.change = money;
    }
  }

  dispenseItem() {
    this.itemDropped = true;
    this.currentStatus = VendingStatus.DispenseItem;
    setTimeout(() => this.reset(), 3000);
  }

  reset() {
    this.isResetting = true;
    this.change = this.currentStatus === VendingStatus.DoingPayment ? (this.totalSumOfMoneyInsertedByUser) : this.change;
    this.keypadValue = '';
    this.selectedItem = null;
    this.cardReader?.reset();
    this.currentStatus = VendingStatus.Initial;
    this.totalSumOfMoneyInsertedByUser = 0;
    this.moneyInsertedByUser = {};
    this.validationErrors = null;
    this.isResetting = false;
  }

}
