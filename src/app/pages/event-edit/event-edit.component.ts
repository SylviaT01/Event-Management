import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Event } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-edit',
  standalone: false,
  templateUrl: './event-edit.component.html',
  styleUrl: './event-edit.component.css'
})
export class EventEditComponent implements OnInit {
  event: Event | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getEvent(id).subscribe({
        next: (event) => (this.event = { ...event }),
        error: () => this.showErrorNotification('Load Fail', 'Fail to load event')
      });
    }
  }

  onSubmit(): void {
    if (!this.event || !this.event.name || !this.event.location || !this.event.date || this.event.capacity <= 0) {
      this.showErrorNotification('Required fields', 'Please fill all fields correctly')
      return;
    }
    this.dataService.updateEvent(this.event).subscribe({
      next: () => {
        this.showSuccessNotification('Event Updated', 'The event has been updated successfully.');
        this.router.navigate(['/events']);
      },
      error: () => this.showErrorNotification('Update Fail', 'Fail to update event'),
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
