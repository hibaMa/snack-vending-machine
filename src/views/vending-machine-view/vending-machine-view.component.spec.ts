import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendingMachineViewComponent } from './vending-machine-view.component';
import { VendingStatus } from './vending-status';
import { VendingMachineViewModule } from './vending-machine-view.module';

fdescribe('VendingMachineViewComponent', () => {
  let component: VendingMachineViewComponent;
  let fixture: ComponentFixture<VendingMachineViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VendingMachineViewModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingMachineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test user input map', () => {
    spyOn(component, 'executePayment');
    component.currentStatus = VendingStatus.EnteringPosition;
    component.keypadValue = 'C5'; // price = 14
    component.selectItemAfterValidatePos();
    component.currentStatus = VendingStatus.DoingPayment;
    component.onMoneyAdded(10);
    component.onMoneyAdded(1);
    component.onMoneyAdded(2);
    component.onMoneyAdded(50); // total = 63
    expect(component.executePayment).toHaveBeenCalledWith({
      item: Object({price: 14, position: 'C5', availableInStock: true}),
      paymentMethode: 1,
      moneyMapAmount: Object({1: 1, 2: 1, 10: 1, 50: 1})
    });
  });

});
