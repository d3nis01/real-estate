import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl + '/Users';

  constructor(private http: HttpClient, private router: Router) {}

  // Get all users - returns an observable of IUser[]
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}`);
  }

  // Get a user by ID - returns an observable of IUser
  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }

  // Create a new user - returns an observable of the created IUser
  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}`, user);
  }

  // Update a user - returns an observable of the updated IUser
  updateUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/${id}`, user);
  }

  // Delete a user - returns an observable of void (no content returned)
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
