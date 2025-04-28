import { Component, OnInit } from '@angular/core';
import { Attendee, DataService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-attendee-detail',
  standalone: false,
  templateUrl: './attendee-detail.component.html',
  styleUrl: './attendee-detail.component.css'
})
export class AttendeeDetailComponent implements OnInit {
  attendee: Attendee | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getAttendee(id).subscribe({
        next: (attendee) => (this.attendee = attendee),
        error: () => this.toastr.error('Failed to load attendee'),
      });
    }
  }

}
