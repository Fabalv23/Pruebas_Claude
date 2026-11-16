import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastoralMenuComponent } from './pastoral-menu.component';

describe('PastoralMenuComponent', () => {
  let component: PastoralMenuComponent;
  let fixture: ComponentFixture<PastoralMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastoralMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastoralMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
