import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService, Event } from '../../services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-attendee-register',
  standalone: false,
  templateUrl: './attendee-register.component.html',
  styleUrls: ['./attendee-register.component.css']
})
export class AttendeeRegisterComponent implements OnInit {
  attendee = {
    fullName: '',
    email: '',
    eventId: '',
  };
  events: Event[] = [];

  constructor(
    private dataService: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataService.getEvents().subscribe({
      next: (events) => (this.events = events), 
      error: () => this.showErrorNotification('Load Fail', 'Failed to load events'),
    });
  }

  onSubmit(): void {
    if (!this.attendee.fullName || !this.attendee.email || !this.attendee.eventId) {
      this.showErrorNotification('Required fields', 'Please fill all fields correctly')
      return;
    }
    this.dataService.createAttendee(this.attendee).subscribe({
      next: () => {
        this.showSuccessNotification('Attendee Registered', 'Attendee registered successfully.');
        this.router.navigate(['/attendees']);
      },
      error: () => this.showErrorNotification('Registration Fail', 'Failed to register attendee'),
    });
  }

  cancel() : void{
    this.router.navigate(['/attendees'])
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