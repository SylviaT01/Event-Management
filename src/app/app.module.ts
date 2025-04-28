import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventListComponent } from './pages/event-list/event-list.component';
import { EventCreateComponent } from './pages/event-create/event-create.component';
import { EventEditComponent } from './pages/event-edit/event-edit.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { AttendeeRegisterComponent } from './pages/attendee-register/attendee-register.component';
import { AttendeeListComponent } from './pages/attendee-list/attendee-list.component';
import { AttendeeDetailComponent } from './pages/attendee-detail/attendee-detail.component';
import { TicketIssueComponent } from './pages/ticket-issue/ticket-issue.component';
import { TicketListComponent } from './pages/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './pages/ticket-detail/ticket-detail.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventCreateComponent,
    EventEditComponent,
    EventDetailComponent,
    AttendeeRegisterComponent,
    AttendeeListComponent,
    AttendeeDetailComponent,
    TicketIssueComponent,
    TicketListComponent,
    TicketDetailComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}