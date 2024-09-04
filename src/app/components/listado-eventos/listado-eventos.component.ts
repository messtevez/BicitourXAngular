import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-listado-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-eventos.component.html',
  styleUrls: ['./listado-eventos.component.css']
})
export class ListadoEventosComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService, private http: HttpClient) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(response => {
      if (response.ok) {
        this.events = response.events;
      }
    });
  }

  requestToJoin(eventId: string): void {
    const userId = 'userIdStoredInSessionOrSomewhereElse';
    this.http.post(`/api/events/${eventId}/request`, { id: userId })
      .pipe(
        catchError(error => {
          console.error('Error sending request', error);
          return [];
        })
      )
      .subscribe((response: any) => {
        if (response.ok) {
          alert('Request sent! The admin will notify you.');
        } else {
          alert(`Error: ${response.msg}`);
        }
      });
  }
}