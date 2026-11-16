import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallecuentaComponent } from './detallecuenta.component';

describe('DetallecuentaComponent', () => {
  let component: DetallecuentaComponent;
  let fixture: ComponentFixture<DetallecuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallecuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallecuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
