import { Component, OnInit } from '@angular/core';
import { Attendee, Event, DataService, Ticket } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  standalone: false,
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  events: Event[] = [];
  eventMap: { [key: string]: string } = {}; 
  attendees: Attendee[] =[];
  attendeeMap: { [key: string]: string } = {}; 


  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadEvents();
    this.loadAttendees()

  }

  loadTickets(): void {
    this.dataService.getTickets().subscribe({
      next: (tickets) => (this.tickets = tickets),
      error: () => this.toastr.error('Failed to load tickets'),
    });
  }

  deleteTicket(id: string): void {
    if (confirm('Are you sure you want to cancel this ticket?')) {
      this.dataService.deleteTicket(id).subscribe({
        next: () => {
          this.toastr.success('Ticket cancelled successfully');
          this.loadTickets();
        },
        error: () => this.toastr.error('Failed to cancel ticket'),
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

  loadAttendees(): void {
    this.dataService.getAttendees().subscribe({
      next: (attendees) => {
        this.attendees = attendees
        this.attendeeMap ={};
        for (const attendee of attendees) {
          this.attendeeMap[attendee.id] = attendee.fullName;
        }


      },
      error: () => this.toastr.error('Failed to load attendees'),
    });
  }


}
