import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventService } from '../../services/event.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard-user',
  standalone: true,
  imports: [FullCalendarModule, NavbarComponent],
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: (info) => {
      this.eventDistance = info.event.extendedProps['distance']
      this.eventTime = info.event.extendedProps['hour']
      this.eventLocation = info.event.extendedProps['location']
      this.eventCategory = info.event.extendedProps['category']
      this.monstrarVentana = true
    }
  };

  public selectedEventId: string = '';
  eventDistance = ''
  eventTime = ''
  eventLocation = ''
  eventCategory = ''
  monstrarVentana = false


  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
    const userId = sessionStorage.getItem('id'); 
    if (userId) {
      this.eventService.getEventsByUserId(userId).subscribe({
        next: (response) => {
          if (response.ok && response.events) {
            this.calendarOptions.events = response.events.map((event: any) => ({
              title: event.title,
              start: event.date,
              end: event.date,
              extendedProps: {  
                distance: event.distance,
                hour: event.hour,
                location: event.location,
                category: event.category,
              }
            }));
          }
        },
        error: (error) => {
          console.error('Error al obtener los eventos del usuario:', error);
        }
      });
    } else {
      console.error('No se encontró el ID del usuario en sessionStorage.');
    }
  }

  navigateToCreateEvent(): void {
    this.router.navigate(['/eventos']);
  }
}
