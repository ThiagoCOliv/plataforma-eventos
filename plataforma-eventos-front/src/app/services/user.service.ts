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
  private apiUrl = `${environment.apiBaseUrl}user`;
  constructor(private readonly http: HttpClient) { }

  postUser(user: User): Observable<HttpResponse<any>>
  {
    return this.http.post<User>(this.apiUrl, user, { observe: 'response' });
  }

  loginUser(email: string, password: string): Observable<HttpResponse<any>>
  {
    return this.http.post(`${this.apiUrl}/login`, { email, password }, { observe: 'response' });
  }

  validateUser(validationNumber: number): Observable<HttpResponse<any>>
  {
    return this.http.put(`${this.apiUrl}/validation`, { validationNumber }, { observe: 'response' });
  }

  getUserEvents(): Observable<HttpResponse<any>>
  {
    return this.http.get(`${this.apiUrl}/events`, { observe: 'response' });
  }

  getValidationNumber(): Observable<HttpResponse<any>>
  {
    return this.http.get(`${this.apiUrl}/validation/number`, { observe: 'response' });
  }
}
