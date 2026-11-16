import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioEstudiantesComponent } from './horario-estudiantes.component';

describe('HorarioEstudiantesComponent', () => {
  let component: HorarioEstudiantesComponent;
  let fixture: ComponentFixture<HorarioEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
