import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-event-create',
  standalone: false,
  templateUrl: './event-create.component.html',
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {



  event = {
    name: '',
    location: '',
    date: '',
    capacity: 0,
  };

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    if (!this.event.name || !this.event.location || !this.event.date || this.event.capacity <= 0) {
      this.showErrorNotification('Required fields', 'Please fill all fields correctly')
      return;
    }
    this.dataService.createEvent(this.event).subscribe({
      next: () => {
        this.showSuccessNotification('Event Created', 'Event created successfully.');
        this.router.navigate(['/events']);
      },
      error: () => this.showErrorNotification('Create Fail', 'Failed to create event'),
    });
  }
  cancel(): void {
    this.router.navigate(['/events']);
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

