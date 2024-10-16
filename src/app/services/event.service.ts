import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  public createEvent(eventData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/create-event`, eventData);
  }

  public getAllEvents(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/get-all-events`);
  }

  public getEventById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/get-event/${id}`);
  }

  public updateEventById(id: string, updatedData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/update-event/${id}`, updatedData);
  }

  public deleteEventById(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/del-event/${id}`);
  }

  public addAttendeeToEvent(id: string, attendeeData: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/events/${id}/add`, attendeeData);
  }

  public getEventsByUserId(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/events/user/${userId}`);
  }

  public getEventsByUserParticipation(userId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/events/user/${userId}/participation`);
  }
}
