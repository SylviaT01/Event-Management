import { Component, OnInit } from '@angular/core';
import { Attendee, DataService, Event } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendee-detail',
  standalone: false,
  templateUrl: './attendee-detail.component.html',
  styleUrl: './attendee-detail.component.css'
})
export class AttendeeDetailComponent implements OnInit {
  attendee: Attendee | null = null;
  events: Event[] = [];
  eventMap: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAttendeeDetails()
    this.loadEvents()
  }

  loadAttendeeDetails() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getAttendee(id).subscribe({
        next: (attendee) => (this.attendee = attendee),
        error: () => this.toastr.error('Failed to load attendee'),
      });
    }
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


}
