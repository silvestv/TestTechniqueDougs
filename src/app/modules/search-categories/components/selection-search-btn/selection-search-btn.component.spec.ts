import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionSearchBtnComponent } from './selection-search-btn.component';

describe('SelectionSearchBtnComponent', () => {
  let component: SelectionSearchBtnComponent;
  let fixture: ComponentFixture<SelectionSearchBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionSearchBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionSearchBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
