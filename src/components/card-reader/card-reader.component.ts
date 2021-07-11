import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vm-card-reader',
  templateUrl: './card-reader.component.html',
  styleUrls: ['./card-reader.component.scss']
})
export class CardReaderComponent {

  cardNumber: string;

  @Output()
  public onCardScan: EventEmitter<string> = new EventEmitter();

  reset() {
    this.cardNumber = null;
  }
}
