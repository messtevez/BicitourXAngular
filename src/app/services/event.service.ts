import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/create-event`, eventData);
  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/get-all-events`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/get-event/${id}`);
  }

  updateEventById(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/update-event/${id}`, updatedData);
  }

  deleteEventById(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/del-event/${id}`);
  }

  addAttendeeToEvent(id: string, attendeeData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/events/${id}/reg`, attendeeData);
  }
}
