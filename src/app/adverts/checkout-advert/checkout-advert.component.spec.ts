import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAdvertComponent } from './checkout-advert.component';

describe('CheckoutAdvertComponent', () => {
  let component: CheckoutAdvertComponent;
  let fixture: ComponentFixture<CheckoutAdvertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutAdvertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
