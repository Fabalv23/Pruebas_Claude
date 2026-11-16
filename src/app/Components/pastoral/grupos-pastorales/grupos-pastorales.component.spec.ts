import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposPastoralesComponent } from './grupos-pastorales.component';

describe('GruposPastoralesComponent', () => {
  let component: GruposPastoralesComponent;
  let fixture: ComponentFixture<GruposPastoralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposPastoralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposPastoralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
