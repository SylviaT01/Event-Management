import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Event } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

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
        error: () => this.toastr.error('Failed to load event'),
      });
    }
  }

  onSubmit(): void {
    if (!this.event || !this.event.name || !this.event.location || !this.event.date || this.event.capacity <= 0) {
      this.toastr.error('Please fill all fields correctly');
      return;
    }
    this.dataService.updateEvent(this.event).subscribe({
      next: () => {
        this.toastr.success('Event updated successfully');
        this.router.navigate(['/events']);
      },
      error: () => this.toastr.error('Failed to update event'),
    });
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }
}
