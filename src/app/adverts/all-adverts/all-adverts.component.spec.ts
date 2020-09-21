import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdvertsComponent } from './all-adverts.component';

describe('AllAdvertsComponent', () => {
  let component: AllAdvertsComponent;
  let fixture: ComponentFixture<AllAdvertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAdvertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAdvertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
