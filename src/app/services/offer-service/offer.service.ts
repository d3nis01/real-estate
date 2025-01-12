import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOffer } from '../../models/offer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = environment.apiUrl + '/Offers';

  constructor(private http: HttpClient) {}

  /**
   * Create a new offer
   * @param offer Offer data
   * @returns Observable<IOffer> Created offer
   */
  createOffer(offer: IOffer): Observable<IOffer> {
    return this.http.post<IOffer>(`${this.apiUrl}`, offer, {
      withCredentials: true,
    });
  }

  /**
   * Get all offers with optional pagination and sorting
   * @param pageNumber Current page number
   * @param pageSize Number of items per page
   * @param sortProperty Property to sort by
   * @param isDescending Whether sorting is descending
   * @returns Observable<{ items: IOffer[]; totalCount: number }>
   */
  getAllOffers(
    pageNumber: number = 1,
    pageSize: number = 10,
    sortProperty: string = '',
    isDescending: boolean = false
  ): Observable<{ items: IOffer[]; totalCount: number }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('isDescending', isDescending.toString());

    if (sortProperty) {
      params = params.set('sortProperty', sortProperty);
    }

    return this.http.get<{ items: IOffer[]; totalCount: number }>(
      `${this.apiUrl}`,
      {
        params,
        withCredentials: true,
      }
    );
  }

  /**
   * Get all offers by company ID with pagination
   * @param companyId Company ID
   * @param pageNumber Current page number
   * @param pageSize Number of items per page
   * @returns Observable<{ items: IOffer[]; totalCount: number }>
   */
  getAllOffersByCompanyId(
    companyId: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<{ items: IOffer[]; totalCount: number }> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{ items: IOffer[]; totalCount: number }>(
      `${this.apiUrl}/Company/${companyId}`,
      { params, withCredentials: true }
    );
  }

  /**
   * Get all offers by listing ID
   * @param listingId Listing ID
   * @returns Observable<IOffer[]> Offers associated with the listing ID
   */
  getAllOffersByListingId(listingId: string): Observable<IOffer[]> {
    return this.http.get<IOffer[]>(`${this.apiUrl}/Listing/${listingId}`, {
      withCredentials: true,
    });
  }

  /**
   * Get an offer by ID
   * @param id Offer ID
   * @returns Observable<IOffer> Offer details
   */
  getOfferById(id: string): Observable<IOffer> {
    return this.http.get<IOffer>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  /**
   * Update an offer
   * @param id Offer ID
   * @param offer Updated offer data
   * @returns Observable<IOffer> Updated offer
   */
  updateOffer(id: string, offer: IOffer): Observable<IOffer> {
    return this.http.put<IOffer>(`${this.apiUrl}/${id}`, offer, {
      withCredentials: true,
    });
  }

  /**
   * Delete an offer
   * @param id Offer ID
   * @param companyId Company ID
   * @returns Observable<void> Indicates success of deletion
   */
  deleteOffer(id: string, companyId: string): Observable<void> {
    const params = new HttpParams().set('companyId', companyId);

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      params,
      withCredentials: true,
    });
  }
}
