import { Component, Input } from '@angular/core';

@Component({
  selector: 'vm-change-function',
  templateUrl: './change-function.component.html',
  styleUrls: ['./change-function.component.scss']
})
export class ChangeFunctionComponent {

  @Input()
  change: number;

  @Input()
  changeList: number;
}
