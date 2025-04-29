import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';


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
      this.toastr.error('Please fill all fields correctly');
      return;
    }
    this.dataService.createEvent(this.event).subscribe({
      next: () => {
        this.toastr.success('Event created successfully');
        this.router.navigate(['/events']);
      },
      error: () => this.toastr.error('Failed to create event'),
    });
  }
  cancel(): void {
    this.router.navigate(['/events']);
  }
}

