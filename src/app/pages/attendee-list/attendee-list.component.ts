import { Component, OnInit } from '@angular/core';
import { Attendee, DataService } from '../../services/data.service';
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

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAttendees();
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
