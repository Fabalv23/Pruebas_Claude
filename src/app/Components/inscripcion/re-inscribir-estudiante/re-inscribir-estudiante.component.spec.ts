import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReInscribirEstudianteComponent } from './re-inscribir-estudiante.component';

describe('ReInscribirEstudianteComponent', () => {
  let component: ReInscribirEstudianteComponent;
  let fixture: ComponentFixture<ReInscribirEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReInscribirEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReInscribirEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
