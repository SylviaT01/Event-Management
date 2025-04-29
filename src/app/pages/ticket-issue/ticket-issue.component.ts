import { Component, OnInit } from '@angular/core';
import { Attendee, DataService, Event, Ticket } from '../../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ticket-issue',
  standalone: false,
  templateUrl: './ticket-issue.component.html',
  styleUrl: './ticket-issue.component.css'
})
export class TicketIssueComponent implements OnInit {
  ticket = {
    attendeeId: '',
    eventId: '',
    type: '',
  };
  attendees: Attendee[] = [];
  ticketTypes = ['Regular', 'VIP', 'VVIP'];
  eventCapacity: number | null = null;
  ticketsIssuedCount: number = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataService.getAttendees().subscribe({
      next: (attendees) => (this.attendees = attendees),
      error: () => this.toastr.error('Failed to load attendees'),
    });
  }

  checkCapacityAndIssueTicket(): void {
    if (!this.ticket.attendeeId || !this.ticket.type) {
      this.showErrorNotification('Required fields', 'Please fill all fields correctly');
      return;
    }
    const attendee = this.attendees.find((a) => a.id === this.ticket.attendeeId);
    if (!attendee) {
      this.toastr.error('Invalid attendee');
      return;
    }
    this.ticket.eventId = attendee.eventId;

    // Fetch event details to get capacity
    this.dataService.getEvent(this.ticket.eventId).subscribe({
      next: (event: Event) => {
        this.eventCapacity = event.capacity;
        // Fetch tickets issued for this event
        this.dataService.getTickets().subscribe({
          next: (tickets: Ticket[]) => {
            this.ticketsIssuedCount = tickets.filter(t => t.eventId === this.ticket.eventId).length;
            if (this.ticketsIssuedCount >= this.eventCapacity!) {
              this.showWarningNotification('Capacity Full', 'All tickets for this event have been issued.');
            } else {
              this.issueTicket();
            }
          },
          error: () => this.showErrorNotification('Error', 'Failed to load tickets')
        });
      },
      error: () => this.showErrorNotification('Error', 'Failed to load event details')
    });
  }

  issueTicket(): void {
    this.dataService.issueTicket(this.ticket).subscribe({
      next: () => {
        this.showSuccessNotification('Ticket Issued', 'Ticket issued successfully.');
        this.router.navigate(['/tickets']);
      },
      error: () => this.showErrorNotification('Issue Fail', 'Failed to issue ticket')
    });
  }

  onSubmit(): void {
    this.checkCapacityAndIssueTicket();
  }

  cancel(): void {
    this.router.navigate(['/tickets']);
  }

  showNotification(icon: 'success' | 'error' | 'warning' | 'info' | 'question',
    title: string,
    text: string): void {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false
    });
  }

  showSuccessNotification(title: string, text: string): void {
    this.showNotification('success', title, text);
  }
  showWarningNotification(title: string, text: string): void {
    this.showNotification('warning', title, text);
  }
  showErrorNotification(title: string, text: string): void {
    this.showNotification('error', title, text);
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
