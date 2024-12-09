import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  register(user: {
    username: string;
    password: string;
    confirmPassword: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, user);
  }
}
