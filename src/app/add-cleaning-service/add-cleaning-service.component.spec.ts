import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCleaningServiceComponent } from './add-cleaning-service.component';

describe('AddCleaningServiceComponent', () => {
  let component: AddCleaningServiceComponent;
  let fixture: ComponentFixture<AddCleaningServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCleaningServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCleaningServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
