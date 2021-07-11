import { ControlValueAccessor } from '@angular/forms';
import { Input, OnInit, Directive } from '@angular/core';

@Directive()
export abstract class AbstractFormControlComponent<T> implements ControlValueAccessor, OnInit {
  protected _value: T;

  @Input()
  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this.setValue(value);
  }

  public onChange: any = () => {
  };
  public onTouched: any = () => {
  };

  public ngOnInit(): void {
    this._update();
  }

  public registerOnChange(fn): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn): void {
    this.onTouched = fn;
  }

  public writeValue(value): void {
    this.value = value;
  }

  protected setValue(val: T): void {
    this._value = val;

    this.onChange(val);
    this.onTouched();
    this._update();
  }

  protected abstract _update(): void;

  public constructor() {
  }
}
