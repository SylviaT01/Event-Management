import { Component, OnInit } from '@angular/core';
import { DataService, Ticket } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ticket-detail',
  standalone: false,
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css'
})
export class TicketDetailComponent implements OnInit{
  ticket: Ticket | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataService.getTicket(id).subscribe({
        next: (ticket) => (this.ticket = ticket),
        error: () => this.toastr.error('Failed to load ticket'),
      });
    }
  }

}
