import { Component, OnInit } from '@angular/core';
import { Attendee, DataService } from '../../services/data.service';
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
      this.showErrorNotification('Required fields', 'Please fill all fields correctly')
      return;
    }
    const attendee = this.attendees.find((a) => a.id === this.ticket.attendeeId);
    if (attendee) {
      this.ticket.eventId = attendee.eventId; 
      this.dataService.issueTicket(this.ticket).subscribe({
        next: () => {
          this.showSuccessNotification('Event Created', 'Event created successfully.');
          this.router.navigate(['/tickets']);
        },
        error: () => this.showErrorNotification('Create Fail', 'Failed to create event')
      });
    } else {
      this.toastr.error('Invalid attendee');
    }
  }
  cancel():void{
    this.router.navigate(['/tickets'])
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
      showWarningNotification(title: string, text: string): void{
        this.showNotification('warning', title, text)
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
