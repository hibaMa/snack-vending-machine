import {
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractFormControlComponent } from '../abstract-form-control.component';

@Component({
  selector: 'vm-string-input',
  templateUrl: './string-input.component.html',
  styleUrls: ['./string-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StringInputComponent),
      multi: true
    }
  ]
})
export class StringInputComponent extends AbstractFormControlComponent<string> {
  private _isDisabled: boolean = false;
  private _fullWidth: boolean = false;
  private _hasError: boolean;
  inputClass = {};
  public ngClass: any;

  @Input()
  public get fullWidth(): boolean {
    return this._fullWidth;
  }

  public set fullWidth(value: boolean) {
    this._fullWidth = value;

    this._update();
  }

  @Input()
  public get hasError(): boolean {
    return this._hasError;
  }

  public set hasError(value: boolean) {
    this._hasError = value;

    this._update();
  }

  @Input()
  public get isDisabled(): boolean {
    return this._isDisabled;
  }

  public set isDisabled(value: boolean) {
    this._isDisabled = value;
    this._update();
  }

  @Input()
  public type: string;

  @Input()
  public placeholder: string;

  protected _update(): void {
    this.ngClass = {
      'StringInput': true,
      'StringInput--fullWidth': this.fullWidth,
    };
    this.inputClass = {
      'input': true,
      'is-disabled': this.isDisabled,
    };
  }
}
