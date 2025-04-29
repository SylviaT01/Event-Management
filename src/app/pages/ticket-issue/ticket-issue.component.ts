import { Component, OnInit } from '@angular/core';
import { Attendee, DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  onSubmit(): void {
    if (!this.ticket.attendeeId || !this.ticket.type) {
      this.toastr.error('Please fill all fields');
      return;
    }
    const attendee = this.attendees.find((a) => a.id === this.ticket.attendeeId);
    if (attendee) {
      this.ticket.eventId = attendee.eventId; 
      this.dataService.issueTicket(this.ticket).subscribe({
        next: () => {
          this.toastr.success('Ticket issued successfully');
          this.router.navigate(['/tickets']);
        },
        error: () => this.toastr.error('Failed to issue ticket'),
      });
    } else {
      this.toastr.error('Invalid attendee');
    }
  }
  cancel():void{
    this.router.navigate(['/tickets'])
  }

}
