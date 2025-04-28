import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendeeRegisterComponent } from './attendee-register.component';

describe('AttendeeRegisterComponent', () => {
  let component: AttendeeRegisterComponent;
  let fixture: ComponentFixture<AttendeeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendeeRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendeeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
