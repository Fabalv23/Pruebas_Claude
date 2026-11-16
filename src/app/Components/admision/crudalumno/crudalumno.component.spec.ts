import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDAlumnoComponent } from './crudalumno.component';

describe('CRUDAlumnoComponent', () => {
  let component: CRUDAlumnoComponent;
  let fixture: ComponentFixture<CRUDAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRUDAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
