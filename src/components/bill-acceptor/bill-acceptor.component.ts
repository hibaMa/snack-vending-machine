import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vm-bill-acceptor',
  templateUrl: './bill-acceptor.component.html',
  styleUrls: []
})
export class BillAcceptorComponent {

  billValues = [
    {text: '20$', value: 20},
    {text: '50$', value: 50},
  ];

  @Output()
  public onBillAdded = new EventEmitter();

}
