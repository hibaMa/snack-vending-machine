import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormControlComponent } from '../../shared/abstract-form-control.component';

export enum ActionKey {
  ok,
  exit
}

@Component({
  selector: 'vm-keypad',
  templateUrl: './keypad.component.html',
  styleUrls: ['./keypad.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => KeypadComponent),
      multi: true
    }
  ]
})
export class KeypadComponent extends AbstractFormControlComponent<string> {

  ActionKey = ActionKey;
  @Output()
  public actionKeyClicked = new EventEmitter<ActionKey>();

  keys = ['A', 'B', 'C', 'D', 'E', '1', '2', '3', '4', '5'];

  onKeyClick(key): void {
    this.value = this.value + key;
  }

  protected _update(): void {
  }
}
