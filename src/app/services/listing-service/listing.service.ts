import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../../models/listing';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private baseUrl = `${environment.apiUrl}/Listings`;

  constructor(private http: HttpClient) {}

  createListing(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(this.baseUrl, listing, {
      withCredentials: true,
    });
  }

  getAllListings(
    pageNumber: number,
    pageSize: number,
    sortProperty?: string,
    isDescending?: boolean
  ): Observable<{ items: Listing[]; totalCount: number }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (sortProperty) {
      params = params.set('sortProperty', sortProperty);
    }
    if (isDescending !== undefined) {
      params = params.set('isDescending', isDescending.toString());
    }

    return this.http.get<{ items: Listing[]; totalCount: number }>(
      this.baseUrl,
      { params, withCredentials: true }
    );
  }

  getListingsByUserId(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseUrl}/User/${userId}`);
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}/${id}`);
  }

  updateListing(id: string, listing: Listing): Observable<Listing> {
    return this.http.put<Listing>(`${this.baseUrl}/${id}`, listing);
  }

  deleteListing(id: string, userId?: string): Observable<void> {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId);
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { params });
  }
}
