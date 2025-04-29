import { Component, OnInit } from '@angular/core';
import { Attendee, DataService, Ticket, Event} from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket-detail',
  standalone: false,
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent implements OnInit{
  ticket: Ticket | null = null;
  events: Event[] = [];
  eventMap: { [key: string]: string } = {}; 
  attendees: Attendee[] =[];
  attendeeMap: { [key: string]: string } = {}; 

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadTickets()
    this.loadEvents()
    this.loadAttendees()
    
  }
  loadTickets(): void{
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getTicket(id).subscribe({
        next: (ticket) => (this.ticket = ticket),
        error: () => this.toastr.error('Failed to load ticket'),
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
