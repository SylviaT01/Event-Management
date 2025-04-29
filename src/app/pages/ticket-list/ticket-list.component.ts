import { Component, OnInit } from '@angular/core';
import { Attendee, Event, DataService, Ticket } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  async deleteTicket(id: string): Promise<void >{
    const confirmed = await this.confirmAction('Delete Warning', 'Are you sure you want to delete this ticket?');
    if (confirmed) {
      this.dataService.deleteTicket(id).subscribe({
        next: () => {
          this.showSuccessNotification('Event Deleted', 'The event has been deleted successfully.');
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
  showNotification(icon: 'success' | 'error' | 'warning' | 'info' | 'question',
          title: string,
          text: string): void {
          Swal.fire({
            icon: icon,
            title: title,
            text: text,
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      
      
        showSuccessNotification(title: string, text: string): void {
          this.showNotification('success', title, text);
        }
        showErrorNotification(title: string, text: string): void{
          this.showNotification('error', title, text)
        }
      
      
        confirmAction(title: string, text: string, confirmButtonText: string = 'Yes'): Promise<boolean> {
          return new Promise((resolve) => {
            Swal.fire({
              title: title,
              text: text,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: confirmButtonText
            }).then((result) => {
              resolve(result.isConfirmed);
            });
          });
        }
  


}
