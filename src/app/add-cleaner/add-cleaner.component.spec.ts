import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCleanerComponent } from './add-cleaner.component';

describe('AddCleanerComponent', () => {
  let component: AddCleanerComponent;
  let fixture: ComponentFixture<AddCleanerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCleanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCleanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
