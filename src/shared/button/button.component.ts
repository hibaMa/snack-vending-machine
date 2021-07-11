import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';

export enum ButtonBorderRadius {
  All = 'all',
  Top = 'top',
  Left = 'left',
  None = 'none',
  Right = 'right',
  Bottom = 'bottom'
}

export enum ButtonAppearance {
  Primary = 'primary',
  Secondary = 'secondary',
}

export enum ButtonSize {
  Large = 'large',
  Medium = 'medium',
}

@Component({
  selector: 'vm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges, OnInit {
  @Input()
  public borderRadius: ButtonBorderRadius = ButtonBorderRadius.All;

  @Input()
  public appearance: ButtonAppearance;

  @Output()
  public click: EventEmitter<MouseEvent> = new EventEmitter();

  @Input()
  public isDisabled: boolean;

  @Input()
  public size: ButtonSize = ButtonSize.Medium;

  @Input()
  public isHidden: boolean;

  public ngClass: any;

  @Input()
  public value: any;

  public ngOnChanges(): void {
    this.update();
  }

  public ngOnInit(): void {
    this.update();
  }

  public onClick(event: MouseEvent) {
    event.stopPropagation();

    if (!this.isDisabled) {
      this.click.emit(event);
    }
  }

  public update(): void {
    this.ngClass = {
      'Button': true,
      [`Button--${this.appearance}Appearance`]: true,
      [`Button--${this.borderRadius}BorderRadius`]: true,
      [`Button--${this.size}Size`]: true,
      'is-disabled': this.isDisabled,
      'is-hidden': this.isHidden
    };
  }
}
