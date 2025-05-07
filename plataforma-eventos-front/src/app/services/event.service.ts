import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventService 
{
  private apiUrl = `${environment.apiBaseUrl}events`;
  constructor(private readonly http: HttpClient) { }

  subscribeToEvent(eventId: number, subscriptionInfo: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/${ eventId }/subscribe`, subscriptionInfo, { observe: 'response' });
  }

  postEvent(event: any): Observable<any>
  {
    return this.http.post(this.apiUrl, event, { observe: 'response' });
  }

  updateEvent(eventId: number, event: any): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/${ eventId }`, event, { observe: 'response' });
  }

  getEvent(eventId: number): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/${ eventId }`, { observe: 'response' });
  }

  getEvents(): Observable<any>
  {
    return this.http.get(this.apiUrl, { observe: 'response' });
  }
}
