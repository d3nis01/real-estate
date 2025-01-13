import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/Auth';
  private logoutUrl = environment.apiUrl + '/Users/logout';
  private currentUserUrl = environment.apiUrl + '/Users/me';
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  register(user: {
    username: string;
    email: string;
    password: string;
    city: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, credentials, {
        withCredentials: true,
        responseType: 'text',
      })
      .pipe(
        tap(() => {
          this.checkAuthStatus();
        })
      );
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  private checkAuthStatus(): void {
    this.http
      .get<{ userId: string }>(`${this.currentUserUrl}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          this.currentUserSubject.next(
            response.userId ? { userId: response.userId } : null
          );
        },
        error: () => {
          this.currentUserSubject.next(null);
        },
      });
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.logoutUrl}`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.currentUserSubject.next(null);
          // window.location.reload();
        })
      );
  }
}
