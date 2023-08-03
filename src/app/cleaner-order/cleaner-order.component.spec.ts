import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerOrderComponent } from './cleaner-order.component';

describe('CleanerOrderComponent', () => {
  let component: CleanerOrderComponent;
  let fixture: ComponentFixture<CleanerOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
