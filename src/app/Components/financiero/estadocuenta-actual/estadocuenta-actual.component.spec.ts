import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadocuentaActualComponent } from './estadocuenta-actual.component';

describe('EstadocuentaActualComponent', () => {
  let component: EstadocuentaActualComponent;
  let fixture: ComponentFixture<EstadocuentaActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadocuentaActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadocuentaActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
