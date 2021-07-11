import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendingMachineViewComponent } from '../views/vending-machine-view/vending-machine-view.component';
import { RouterModule, Routes } from '@angular/router';
import { VendingMachineViewModule } from '../views/vending-machine-view/vending-machine-view.module';

const routes: Routes = [
  {
    path: '',
    component: VendingMachineViewComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    VendingMachineViewModule,
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}
