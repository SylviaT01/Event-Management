import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  capacity: number;
  ticketsIssued?: number;
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
  private baseUrl = 'http://localhost:3000'; 
  
  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/events`).pipe(
      catchError(this.handleError)
    );
  }
  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/events/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createEvent(event: Omit<Event, 'id'>): Observable<Event> {
    const newEvent = { ...event, id: uuidv4() };
    return this.http.post<Event>(`${this.baseUrl}/events`, newEvent).pipe(
      catchError(this.handleError)
    );
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/events/${event.id}`, event).pipe(
      catchError(this.handleError)
    );
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/events/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getAttendees(): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(`${this.baseUrl}/attendees`).pipe(
      catchError(this.handleError)
    );
  }

  getAttendeesByEvent(eventId: string): Observable<Attendee[]> {
    return this.http.get<Attendee[]>(`${this.baseUrl}/attendees?eventId=${eventId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAttendee(id: string): Observable<Attendee> {
    return this.http.get<Attendee>(`${this.baseUrl}/attendees/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createAttendee(attendee: Omit<Attendee, 'id'>): Observable<Attendee> {
    const newAttendee = { ...attendee, id: uuidv4() };
    return this.http.post<Attendee>(`${this.baseUrl}/attendees`, newAttendee).pipe(
      catchError(this.handleError)
    );
  }

  deleteAttendee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/attendees/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/tickets`).pipe(
      catchError(this.handleError)
    );
  }

  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/tickets/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  issueTicket(ticket: Omit<Ticket, 'id'>): Observable<Ticket> {
    const newTicket = { ...ticket, id: uuidv4() };
    return this.http.post<Ticket>(`${this.baseUrl}/tickets`, newTicket).pipe(
      catchError(this.handleError),
      // After ticket is issued, update the event's ticketsIssued count
      // Using switchMap to chain the updateEvent call
      switchMap((issuedTicket: Ticket) => {
        return this.getEvent(issuedTicket.eventId).pipe(
          switchMap((event) => {
            const updatedEvent = { ...event };
            updatedEvent.ticketsIssued = (updatedEvent.ticketsIssued ?? 0) + 1;
            return this.updateEvent(updatedEvent).pipe(
              map(() => issuedTicket)
            );
          })
        );
      })
    );
  }

  deleteTicket(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tickets/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}