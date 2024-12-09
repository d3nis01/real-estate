import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Listing } from '../../models/listing';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ListingService {
  private baseUrl = environment.apiUrl + '/listings';

  constructor(private http: HttpClient) {}

  /**
   * Create a new listing
   * @param listing - Listing data
   * @returns Observable<Listing> - Created listing
   */
  createListing(listing: Listing): Observable<Listing> {
    return this.http.post<Listing>(`${this.baseUrl}`, listing);
  }

  /**
   * Fetch all listings with pagination
   * @param pageNumber - Page number for pagination
   * @param pageSize - Number of items per page
   * @returns Observable<{ items: Listing[]; totalCount: number }> - Paginated listings and total count
   */
  getAllListings(
    pageNumber: number,
    pageSize: number
  ): Observable<{ items: Listing[]; totalCount: number }> {
    return this.http.get<{ items: Listing[]; totalCount: number }>(
      `${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  /**
   * Fetch all listings by user ID
   * @param userId - User ID
   * @returns Observable<Listing[]> - Listings for the given user
   */
  getAllListingsByUserId(userId: string): Observable<Listing[]> {
    return this.http.get<Listing[]>(`${this.baseUrl}/User/${userId}`);
  }

  /**
   * Fetch all listings sorted by date in ascending order
   * @returns Observable<Listing[]> - Listings sorted by date
   */
  getAllListingsByDateAscending(): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `http://localhost:5213/Listing/DateAscending`
    );
  }
  /**
   * Fetch all listings sorted by budget in ascending order
   * @returns Observable<Listing[]> - Listings sorted by budget
   */
  getAllListingsByBudgetAscending(): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      `http://localhost:5213/Listing/BudgetAscending`
    );
  }

  /**
   * Fetch a listing by ID
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
   * @returns Observable<void> - Indicates success of deletion
   */
  deleteListing(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
