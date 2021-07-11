import { Component, Input, OnChanges } from '@angular/core';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vm-item-slot',
  templateUrl: './item-slot.component.html',
  styleUrls: ['./item-slot.component.scss']
})
export class ItemSlotComponent implements OnChanges {

  ngClass = {};
  faApple = faAppleAlt;

  @Input()
  position: string;

  @Input()
  availableInStock: boolean;

  @Input()
  selected: boolean;

  constructor() {
  }

  ngOnChanges(): void {
    this.ngClass = {
      ItemSlot: true,
      'ItemSlot--available': this.availableInStock,
      'ItemSlot--selected': this.selected
    };
  }

}
