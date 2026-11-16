import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPreInscripcionComponent } from './cpre-inscripcion.component';

describe('CPreInscripcionComponent', () => {
  let component: CPreInscripcionComponent;
  let fixture: ComponentFixture<CPreInscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPreInscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPreInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
