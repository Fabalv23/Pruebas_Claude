import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PvalidainscritoComponent } from './pvalidainscrito.component';

describe('PvalidainscritoComponent', () => {
  let component: PvalidainscritoComponent;
  let fixture: ComponentFixture<PvalidainscritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PvalidainscritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PvalidainscritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
