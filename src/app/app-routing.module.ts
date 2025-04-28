import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventCreateComponent } from './pages/event-create/event-create.component';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { AttendeeRegisterComponent } from './pages/attendee-register/attendee-register.component';
import { AttendeeDetailComponent } from './pages/attendee-detail/attendee-detail.component';
import { AttendeeListComponent } from './pages/attendee-list/attendee-list.component';
import { TicketIssueComponent } from './pages/ticket-issue/ticket-issue.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';

const routes: Routes = [
  { path: 'events', component: EventListComponent },
  { path: 'events/create', component: EventCreateComponent },
  { path: 'events/edit/:id', component: EventEditComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'attendees/register', component: AttendeeRegisterComponent },
  { path: 'attendees', component: AttendeeListComponent },
  { path: 'attendees/:id', component: AttendeeDetailComponent },
  { path: 'tickets/issue', component: TicketIssueComponent },
  { path: 'tickets', component: TicketListComponent },
  { path: 'tickets/:id', component: TicketDetailComponent },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
