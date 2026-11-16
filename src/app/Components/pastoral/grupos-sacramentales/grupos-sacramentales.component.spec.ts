import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposSacramentalesComponent } from './grupos-sacramentales.component';

describe('GruposSacramentalesComponent', () => {
  let component: GruposSacramentalesComponent;
  let fixture: ComponentFixture<GruposSacramentalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposSacramentalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposSacramentalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
