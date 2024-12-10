import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/Auth';
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
    return this.http.post(`${this.baseUrl}/register`, user); // Call the backend register endpoint
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap(() => {
          this.checkAuthStatus(); 
        })
      );
  }

  // Get the current user as an observable
  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  private checkAuthStatus(): void {
    this.http.get(`${this.baseUrl}/me`, { withCredentials: true }).subscribe({
      next: (user: any) => {
        this.currentUserSubject.next(user); 
      },
      error: () => {
        this.currentUserSubject.next(null); 
      },
    });
  }
}
