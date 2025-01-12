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

  /**
   * Create a new listing
   * @param listing - Listing data
   * @returns Observable<Listing> - Created listing
   */
  createListing(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(this.baseUrl, listing, {
      withCredentials: true,
    });
  }

  /**
   * Fetch all listings with pagination and optional sorting
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @param sortProperty - Property to sort by (optional)
   * @param isDescending - Whether to sort in descending order (optional)
   * @returns Observable<{ items: Listing[]; totalCount: number }> - Paginated listings and total count
   */
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

  /**
   * Fetch listings by user ID
   * @param userId - User ID
   * @returns Observable<Listing[]> - Listings for the given user
   */
  getListingsByUserId(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseUrl}/User/${userId}`);
  }

  /**
   * Fetch a specific listing by ID
   * @param id - Listing ID
   * @returns Observable<Listing> - Listing details
   */
  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a listing
   * @param id - Listing ID
   * @param listing - Updated listing data
   * @returns Observable<Listing> - Updated listing
   */
  updateListing(id: string, listing: Listing): Observable<Listing> {
    return this.http.put<Listing>(`${this.baseUrl}/${id}`, listing);
  }

  /**
   * Delete a listing
   * @param id - Listing ID
   * @param userId - Optional user ID for authorization
   * @returns Observable<void> - Indicates success of deletion
   */
  deleteListing(id: string, userId?: string): Observable<void> {
    let params = new HttpParams();
    if (userId) {
      params = params.set('userId', userId);
    }
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { params });
  }
}
