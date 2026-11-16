import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VAsistenciaComponent } from './v-asistencia.component';

describe('VAsistenciaComponent', () => {
  let component: VAsistenciaComponent;
  let fixture: ComponentFixture<VAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
