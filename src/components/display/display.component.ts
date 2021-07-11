import { Component, Input } from '@angular/core';

@Component({
  selector: 'vm-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  @Input()
  message: string;
}
