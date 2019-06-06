import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBlockComponent } from './details-block.component';

describe('DetailsBlockComponent', () => {
  let component: DetailsBlockComponent;
  let fixture: ComponentFixture<DetailsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
