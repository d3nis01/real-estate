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

  getAllUsers(
    pageNumber: number,
    pageSize: number
  ): Observable<{ items: IUser[]; totalCount: number }> {
    return this.http.get<{ items: IUser[]; totalCount: number }>(
      `${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        withCredentials: true,
      }
    );
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.baseUrl}`, user, {
      withCredentials: true,
    });
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.baseUrl}/${id}`, user, {
      withCredentials: true,
    });
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }
}
