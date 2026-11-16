import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CRUDVerComponent } from './crudver.component';

describe('CRUDVerComponent', () => {
  let component: CRUDVerComponent;
  let fixture: ComponentFixture<CRUDVerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CRUDVerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CRUDVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
