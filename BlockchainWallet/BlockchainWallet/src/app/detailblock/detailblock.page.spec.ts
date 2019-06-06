import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailblockPage } from './detailblock.page';

describe('DetailblockPage', () => {
  let component: DetailblockPage;
  let fixture: ComponentFixture<DetailblockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailblockPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailblockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
