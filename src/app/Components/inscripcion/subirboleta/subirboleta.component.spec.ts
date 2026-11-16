import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirboletaComponent } from './subirboleta.component';

describe('SubirboletaComponent', () => {
  let component: SubirboletaComponent;
  let fixture: ComponentFixture<SubirboletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubirboletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirboletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
