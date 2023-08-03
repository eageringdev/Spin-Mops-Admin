import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCategorisComponent } from './all-categoris.component';

describe('AllCategorisComponent', () => {
  let component: AllCategorisComponent;
  let fixture: ComponentFixture<AllCategorisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCategorisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
