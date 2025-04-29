import { Component, OnInit } from '@angular/core';
import { Attendee, DataService, Event } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendee-list',
  standalone: false,
  templateUrl: './attendee-list.component.html',
  styleUrl: './attendee-list.component.css'
})
export class AttendeeListComponent implements OnInit {
  attendees: Attendee[] = [];
  events: Event[] = [];
  eventMap: { [key: string]: string } = {}; 

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
    this.loadAttendees();
  }

  loadEvents(): void {
    this.dataService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
        this.eventMap = {};
        for (const event of events) {
          this.eventMap[event.id] = event.name;
        }
      },
      error: () => this.toastr.error('Failed to load events'),
    });
  }

  loadAttendees(): void {
    this.dataService.getAttendees().subscribe({
      next: (attendees) => (this.attendees = attendees),
      error: () => this.toastr.error('Failed to load attendees'),
    });
  }

  deleteAttendee(id: string): void {
    if (confirm('Are you sure you want to delete this attendee?')) {
      this.dataService.deleteAttendee(id).subscribe({
        next: () => {
          this.toastr.success('Attendee deleted successfully');
          this.loadAttendees();
        },
        error: () => this.toastr.error('Failed to delete attendee'),
      });
    }
  }

}
