import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAcademicoMenuComponent } from './control-academico-menu.component';

describe('ControlAcademicoMenuComponent', () => {
  let component: ControlAcademicoMenuComponent;
  let fixture: ComponentFixture<ControlAcademicoMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAcademicoMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAcademicoMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
