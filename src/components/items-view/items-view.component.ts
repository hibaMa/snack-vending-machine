import { Component, Input } from '@angular/core';
import { VendingMachineItem } from '../../services/vending-machine/vending-machine.service';

@Component({
  selector: 'vm-items-view',
  templateUrl: './items-view.component.html',
  styleUrls: ['./items-view.component.scss']
})
export class ItemsViewComponent  {

  @Input()
  items: VendingMachineItem[];

  @Input()
  enteredPosition: string;

  constructor() {
  }

}
