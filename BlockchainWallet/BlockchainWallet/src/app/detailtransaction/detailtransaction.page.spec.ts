import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailtransactionPage } from './detailtransaction.page';

describe('DetailtransactionPage', () => {
  let component: DetailtransactionPage;
  let fixture: ComponentFixture<DetailtransactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailtransactionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailtransactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
