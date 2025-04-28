import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeDetailComponent } from './attendee-detail.component';

describe('AttendeeDetailComponent', () => {
  let component: AttendeeDetailComponent;
  let fixture: ComponentFixture<AttendeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendeeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
