import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        ButtonGroupComponent
    ],
    exports: [
        ButtonGroupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule
    ]
})
export class ButtonGroupModule { }
