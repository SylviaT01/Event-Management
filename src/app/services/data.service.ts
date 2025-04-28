import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  capacity: number;
}

export interface Attendee {
  id: string;
  fullName: string;
  email: string;
  eventId: string;
}

export interface Ticket {
  id: string;
  attendeeId: string;
  eventId: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl = 'assets/data.json'; // Corrected path
  private mockData: { events: Event[]; attendees: Attendee[]; tickets: Ticket[] } = {
    events: [],
    attendees: [],
    tickets: [],
  }; // Explicitly typed

  constructor(private http: HttpClient) {}

  // Mock data for frontend testing (replace with HTTP calls in real app)
  private getData(): Observable<{
    events: Event[];
    attendees: Attendee[];
    tickets: Ticket[];
  }> {
    return of(this.mockData);
  }

  private updateData(data: {
    events: Event[];
    attendees: Attendee[];
    tickets: Ticket[];
  }): Observable<void> {
    this.mockData = data;
    return of();
  }

  // Events CRUD
  createEvent(event: Omit<Event, 'id'>): Observable<Event> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const newEvent = { ...event, id: uuidv4() };
        data.events.push(newEvent);
        this.updateData(data).subscribe(() => {
          observer.next(newEvent);
          observer.complete();
        });
      });
    });
  }

  getEvents(): Observable<Event[]> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        observer.next(data.events);
        observer.complete();
      });
    });
  }

  getEvent(id: string): Observable<Event> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const event = data.events.find((e) => e.id === id);
        if (event) {
          observer.next(event);
          observer.complete();
        } else {
          observer.error('Event not found');
        }
      });
    });
  }

  updateEvent(updatedEvent: Event): Observable<void> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const index = data.events.findIndex((e) => e.id === updatedEvent.id);
        if (index !== -1) {
          data.events[index] = updatedEvent;
          this.updateData(data).subscribe(() => {
            observer.next();
            observer.complete();
          });
        } else {
          observer.error('Event not found');
        }
      });
    });
  }

  deleteEvent(id: string): Observable<void> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        data.events = data.events.filter((e) => e.id !== id);
        this.updateData(data).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }

  // Attendees CRUD
  createAttendee(attendee: Omit<Attendee, 'id'>): Observable<Attendee> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const newAttendee = { ...attendee, id: uuidv4() };
        data.attendees.push(newAttendee);
        this.updateData(data).subscribe(() => {
          observer.next(newAttendee);
          observer.complete();
        });
      });
    });
  }

  getAttendees(): Observable<Attendee[]> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        observer.next(data.attendees);
        observer.complete();
      });
    });
  }

  getAttendeesByEvent(eventId: string): Observable<Attendee[]> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const attendees = data.attendees.filter((a) => a.eventId === eventId);
        observer.next(attendees);
        observer.complete();
      });
    });
  }

  getAttendee(id: string): Observable<Attendee> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const attendee = data.attendees.find((a) => a.id === id);
        if (attendee) {
          observer.next(attendee);
          observer.complete();
        } else {
          observer.error('Attendee not found');
        }
      });
    });
  }

  deleteAttendee(id: string): Observable<void> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        data.attendees = data.attendees.filter((a) => a.id !== id);
        this.updateData(data).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }

  // Tickets CRUD
  issueTicket(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const newTicket = { ...ticket, id: uuidv4() };
        data.tickets.push(newTicket);
        this.updateData(data).subscribe(() => {
          observer.next(newTicket);
          observer.complete();
        });
      });
    });
  }

  getTickets(): Observable<Ticket[]> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        observer.next(data.tickets);
        observer.complete();
      });
    });
  }

  getTicket(id: string): Observable<Ticket> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        const ticket = data.tickets.find((t) => t.id === id);
        if (ticket) {
          observer.next(ticket);
          observer.complete();
        } else {
          observer.error('Ticket not found');
        }
      });
    });
  }

  deleteTicket(id: string): Observable<void> {
    return new Observable((observer) => {
      this.getData().subscribe((data) => {
        data.tickets = data.tickets.filter((t) => t.id !== id);
        this.updateData(data).subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    });
  }
}