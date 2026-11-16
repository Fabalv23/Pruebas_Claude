import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcusaComponent } from './excusa.component';

describe('ExcusaComponent', () => {
  let component: ExcusaComponent;
  let fixture: ComponentFixture<ExcusaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcusaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcusaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
