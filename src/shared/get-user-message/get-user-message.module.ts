import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetUserMessagePipe } from './get-user-message.pipe';

@NgModule({
  declarations: [GetUserMessagePipe],
  exports: [GetUserMessagePipe],
  imports: [
    CommonModule
  ]
})
export class GetUserMessageModule {
}
