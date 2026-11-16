import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDEstudianteComponent } from './crudestudiante.component';

describe('CRUDEstudianteComponent', () => {
  let component: CRUDEstudianteComponent;
  let fixture: ComponentFixture<CRUDEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRUDEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
