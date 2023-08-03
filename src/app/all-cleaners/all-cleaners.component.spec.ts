import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCleanersComponent } from './all-cleaners.component';

describe('AllCleanersComponent', () => {
  let component: AllCleanersComponent;
  let fixture: ComponentFixture<AllCleanersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCleanersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCleanersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
