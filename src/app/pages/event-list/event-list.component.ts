import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Event } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-list',
  standalone: false,
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})

export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.dataService.getEvents().subscribe({
      next: (events) => (this.events = events),
      error: () => this.toastr.error('Failed to load events'),
    });
  }

  deleteEvent(id: string): void {
    if (confirm('Are you sure you want to delete this event?')) {
      this.dataService.deleteEvent(id).subscribe({
        next: () => {
          this.toastr.success('Event deleted successfully');
          this.loadEvents(); 
        },
        error: () => this.toastr.error('Failed to delete event'),
      });
    }
  }
}


