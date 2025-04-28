import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService, Event } from '../../services/data.service';

@Component({
  selector: 'app-attendee-register',
  standalone: false,
  templateUrl: './attendee-register.component.html',
  styleUrls: ['./attendee-register.component.css']
})
export class AttendeeRegisterComponent implements OnInit {
  attendee = {
    fullName: '',
    email: '',
    eventId: '',
  };
  events: Event[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataService.getEvents().subscribe({
      next: (events) => (this.events = events), // Fixed typo (was thisDrupal)
      error: () => this.toastr.error('Failed to load events'),
    });
  }

  onSubmit(): void {
    if (!this.attendee.fullName || !this.attendee.email || !this.attendee.eventId) {
      this.toastr.error('Please fill all fields');
      return;
    }
    this.dataService.createAttendee(this.attendee).subscribe({
      next: () => {
        this.toastr.success('Attendee registered successfully');
        this.router.navigate(['/attendees']);
      },
      error: () => this.toastr.error('Failed to register attendee'),
    });
  }
}