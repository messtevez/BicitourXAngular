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
    events: []
  };

  constructor(private router: Router, private eventService: EventService) {}

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      this.eventService.getEventsByUserId(userId).subscribe({
        next: (response) => {
          if (response.ok && response.events) {
            this.calendarOptions.events = response.events.map((event: any) => ({
              title: event.name,
              start: event.date + 'T' + event.hour,
              end: event.date + 'T' + event.hour
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
