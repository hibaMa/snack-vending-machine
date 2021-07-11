import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vm-coin-acceptor',
  templateUrl: './coin-acceptor.component.html',
  styleUrls: []
})
export class CoinAcceptorComponent {

  coinValues = [
    {text: '10$', value: 10},
    {text: '5$', value: 5},
    {text: '2$', value: 2},
    {text: '1$', value: 1},
  ];

  @Output()
  public onCoinAdded = new EventEmitter();

}
