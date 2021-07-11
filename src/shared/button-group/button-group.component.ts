import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
} from '@angular/core';
import { ButtonAppearance, ButtonBorderRadius, ButtonComponent, ButtonSize } from '../button/button.component';

@Component({
  selector: 'vm-button-group',
  templateUrl: './button-group.component.html',
})
export class ButtonGroupComponent implements OnChanges, AfterContentInit {

  @ContentChildren(ButtonComponent)
  private _buttons: QueryList<ButtonComponent>;

  @Input()
  public appearance: ButtonAppearance = ButtonAppearance.Secondary;

  @Input()
  public size: ButtonSize = ButtonSize.Medium;

  @Output()
  public click: EventEmitter<string> = new EventEmitter();

  public ngAfterContentInit(): void {
    this.updateButtons();
  }

  public ngOnChanges(): void {
    this.updateButtons();
  }

  protected updateButtons(): void {
    if (!this._buttons) {
      return;
    }

    this._buttons.forEach((button: ButtonComponent, index: number) => {
      const first: boolean = index === 0;
      const last: boolean = index === this._buttons.length - 1;

      button.appearance = this.appearance;
      button.size = this.size;

      if (this._buttons.length > 1) {
        if (first) {
          button.borderRadius = ButtonBorderRadius.Left;
        } else if (last) {
          button.borderRadius = ButtonBorderRadius.Right;
        } else {
          button.borderRadius = ButtonBorderRadius.None;
        }

      }

      button.click.subscribe(() => {
        this.click.emit(button.value);
      });

      button.update();
    });
  }

}
