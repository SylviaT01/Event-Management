import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Event } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.dataService.getEvents().subscribe({
      next: (events) => (this.events = events),
      error: () => this.showErrorNotification('Load Fail', 'Failed to load events'),
    });
  }

  async deleteEvent(id: string): Promise<void> {
    const confirmed = await this.confirmAction('Delete Warning', 'Are you sure you want to delete this event?');
    if (confirmed) {
      this.dataService.deleteEvent(id).subscribe({
        next: () => {
          this.showSuccessNotification('Event Deleted', 'The event has been deleted successfully.');
          this.loadEvents();
        },
        error: () => this.toastr.error('Failed to delete event'),
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


