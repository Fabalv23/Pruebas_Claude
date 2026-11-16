import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinDetalleComponent } from './boletin-detalle.component';

describe('BoletinDetalleComponent', () => {
  let component: BoletinDetalleComponent;
  let fixture: ComponentFixture<BoletinDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoletinDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoletinDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
