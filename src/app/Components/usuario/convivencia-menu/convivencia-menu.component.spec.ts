import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvivenciaMenuComponent } from './convivencia-menu.component';

describe('ConvivenciaMenuComponent', () => {
  let component: ConvivenciaMenuComponent;
  let fixture: ComponentFixture<ConvivenciaMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvivenciaMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvivenciaMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
