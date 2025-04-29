import { Component, OnInit } from '@angular/core';
import { Attendee, DataService, Event } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  async deleteAttendee(id: string): Promise<void> {
    const confirmed = await this.confirmAction('Delete Warning', 'Are you sure you want to delete this attendee?');
    if (confirmed) {
      this.dataService.deleteAttendee(id).subscribe({
        next: () => {
          this.showSuccessNotification('Event Deleted', 'The event has been deleted successfully.');
          this.loadAttendees();
        },
        error: () => this.toastr.error('Failed to delete attendee'),
      });
    }
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
