import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/User.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService 
{
  private apiUrl = `${environment.apiBaseUrl}/users`;
  constructor(private readonly http: HttpClient) { }

  postUser(user: User): Observable<HttpResponse<User>>
  {
    return this.http.post<User>(this.apiUrl, user, { observe: 'response' });
  }
}
