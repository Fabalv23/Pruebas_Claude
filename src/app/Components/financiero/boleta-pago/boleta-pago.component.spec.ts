import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletaPagoComponent } from './boleta-pago.component';

describe('BoletaPagoComponent', () => {
  let component: BoletaPagoComponent;
  let fixture: ComponentFixture<BoletaPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletaPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletaPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
