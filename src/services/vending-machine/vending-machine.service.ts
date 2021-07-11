import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { throwError } from 'rxjs';
import { ValidationErrorKey } from '../../views/vending-machine-view/basic-vending-machine-component';
import { delay, tap } from 'rxjs/operators';

const items = [
  {position: 'A1', price: 1, amountInStock: 2},
  {position: 'A2', price: 2, amountInStock: 2},
  {position: 'A3', price: 3, amountInStock: 2},
  {position: 'A4', price: 4, amountInStock: 2},
  {position: 'A5', price: 5, amountInStock: 2},
  {position: 'B1', price: 6, amountInStock: 2},
  {position: 'B2', price: 6, amountInStock: 0},
  {position: 'B3', price: 7, amountInStock: 2},
  {position: 'B4', price: 8, amountInStock: 2},
  {position: 'B5', price: 9, amountInStock: 2},
  {position: 'C1', price: 10, amountInStock: 2},
  {position: 'C2', price: 11, amountInStock: 2},
  {position: 'C3', price: 12, amountInStock: 0},
  {position: 'C4', price: 13, amountInStock: 0},
  {position: 'C5', price: 14, amountInStock: 2},
  {position: 'D1', price: 15, amountInStock: 2},
  {position: 'D2', price: 16, amountInStock: 2},
  {position: 'D3', price: 17, amountInStock: 2},
  {position: 'D4', price: 18, amountInStock: 2},
  {position: 'D5', price: 19, amountInStock: 2},
  {position: 'E1', price: 20, amountInStock: 2},
  {position: 'E2', price: 21, amountInStock: 2},
  {position: 'E3', price: 22, amountInStock: 2},
  {position: 'E4', price: 23, amountInStock: 2},
  {position: 'E5', price: 24, amountInStock: 2},
];

const availableCreditCards = [
  {cardNumber: '1234', dollarAmountAvailable: 0},
  {cardNumber: '5678', dollarAmountAvailable: 2},
  {cardNumber: 'aaaa', dollarAmountAvailable: 20},
  {cardNumber: 'bbbb', dollarAmountAvailable: 30},
  {cardNumber: 'cccc', dollarAmountAvailable: 40},
];

export interface VendingMachineItem {
  position: string;
  price: number;
  availableInStock: boolean;
}

export interface PurchaseData {
  paymentMethode: PaymentMethode;
  item: VendingMachineItem;
  moneyMapAmount?: {};
  creditCardNumber?: string;
}

export enum PaymentMethode {
  CreditCard,
  Cash
}

export const totalMoneySum = (obj) => {
  let sum = 0;
  // key = money kind [50, 20, 10, 5, 2, 1], value = amount
  Object.entries(obj).forEach(([key, value]) => {
    sum = sum + (Number(key) * (value as number));
  });
  return sum;
};

@Injectable({
  providedIn: 'root'
})
export class VendingMachineService {

  private moneyInVendingMachine = {
    50: 20,
    20: 20,
    10: 20,
    5: 20,
    2: 20,
    1: 20
  };

  private machineAcceptedCurrency = [50, 20, 10, 5, 2, 1];

  getItems(): Observable<VendingMachineItem[]> {
    return of(items.map(i => ({
      price: i.price,
      position: i.position,
      availableInStock: i.amountInStock >= 1
    })));
  }

  purchase(purchaseData: PurchaseData): Observable<any> {
    console.log('before payment moneyInVendingMachine', this.moneyInVendingMachine);
    console.log('before payment items', items);
    if (purchaseData.paymentMethode === PaymentMethode.CreditCard) {
      return this.proceedPaymentByCreditCard(purchaseData).pipe(
        delay(3000),
        tap(() => this.decrementItemQuantity(purchaseData.item)),
        tap(() => {
          console.log('after payment moneyInVendingMachine', this.moneyInVendingMachine);
          console.log('after payment items', items);
        })
      );
    }
    return this.proceedPaymentByCash(purchaseData).pipe(
      delay(3000),
      tap(() => this.decrementItemQuantity(purchaseData.item)),
      tap(() => {
        console.log('after payment moneyInVendingMachine', this.moneyInVendingMachine);
        console.log('after payment items', items);
      })
    );
  }

  // BE logic
  private proceedPaymentByCash(purchaseData: PurchaseData) {
    let totalChange = totalMoneySum(purchaseData.moneyMapAmount) - (purchaseData.item.price);
    const userChange = totalChange;
    const machineMoneyIncUserMoney = {...this.moneyInVendingMachine};
    Object.entries(purchaseData.moneyMapAmount).forEach(([key, value]) => {
      machineMoneyIncUserMoney[key] = machineMoneyIncUserMoney[key] + value;
    });
    if (totalChange === 0) {
      this.moneyInVendingMachine = {...machineMoneyIncUserMoney};
      return of({changeList: {}});
    }
    if (totalMoneySum(machineMoneyIncUserMoney) >= totalChange) { // should be true
      // loop through currency if it exist in the machine and less than change
      // remove from machine and add it to user change
      const changeObject = {};
      this.machineAcceptedCurrency.sort((a, b) => b - a).map(c => {
        while (machineMoneyIncUserMoney[c] > 0 && c <= totalChange) {
          changeObject[c] = (c in changeObject) ? changeObject[c] + 1 : 1;
          totalChange = totalChange - c;
          machineMoneyIncUserMoney[c] = machineMoneyIncUserMoney[c] - 1;
        }
      });
      // can return change to user, so update machineMoney
      if (totalChange === 0) {
        this.moneyInVendingMachine = {...machineMoneyIncUserMoney};
        return of({userChange, changeList: changeObject});
      } else {
        return throwError(ValidationErrorKey.NotEnoughChangeInMachine);
      }
    }
  }


  private decrementItemQuantity(item) {
    const itemIndex = items.findIndex(i => i.position === item.position);
    items[itemIndex].amountInStock = items[itemIndex].amountInStock - 1;
  }

  // BE logic - creditCard
  private proceedPaymentByCreditCard(purchaseData: PurchaseData) {
    const card = availableCreditCards.find(c => c.cardNumber === purchaseData.creditCardNumber);
    if (card) {
      if (card.dollarAmountAvailable >= purchaseData.item.price) {
        return this.withdrawMoneyFromCard(purchaseData.creditCardNumber, purchaseData.item.price);
      }
      return throwError(ValidationErrorKey.NotEnoughMoneyInCard);
    } else {
      return throwError(ValidationErrorKey.InvalidCardNumber);
    }
  }

  private withdrawMoneyFromCard(cardNumber, amount) {
    // should transfer money to different account
    const index = availableCreditCards.findIndex(c => c.cardNumber === cardNumber);
    availableCreditCards[index].dollarAmountAvailable = availableCreditCards[index].dollarAmountAvailable - amount;
    return of(true).pipe(delay(3000));
  }

}
