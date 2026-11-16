import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarExcusaComponent } from './administrar-excusa.component';

describe('AdministrarExcusaComponent', () => {
  let component: AdministrarExcusaComponent;
  let fixture: ComponentFixture<AdministrarExcusaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarExcusaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarExcusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
