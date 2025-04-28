import { Component, OnInit } from '@angular/core';
import { DataService, Ticket } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  standalone: false,
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css'
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.dataService.getTickets().subscribe({
      next: (tickets) => (this.tickets = tickets),
      error: () => this.toastr.error('Failed to load tickets'),
    });
  }

  deleteTicket(id: string): void {
    if (confirm('Are you sure you want to cancel this ticket?')) {
      this.dataService.deleteTicket(id).subscribe({
        next: () => {
          this.toastr.success('Ticket cancelled successfully');
          this.loadTickets();
        },
        error: () => this.toastr.error('Failed to cancel ticket'),
      });
    }
  }

}
