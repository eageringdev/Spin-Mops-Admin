import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCleaningServicesComponent } from './all-cleaning-services.component';

describe('AllCleaningServicesComponent', () => {
  let component: AllCleaningServicesComponent;
  let fixture: ComponentFixture<AllCleaningServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCleaningServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCleaningServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
