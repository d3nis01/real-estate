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

  createOffer(offer: IOffer): Observable<IOffer> {
    return this.http.post<IOffer>(`${this.apiUrl}`, offer, {
      withCredentials: true,
    });
  }

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

  getAllOffersByListingId(listingId: string): Observable<IOffer[]> {
    return this.http.get<IOffer[]>(`${this.apiUrl}/Listing/${listingId}`, {
      withCredentials: true,
    });
  }

  getOfferById(id: string): Observable<IOffer> {
    return this.http.get<IOffer>(`${this.apiUrl}/${id}`, {
      withCredentials: true,
    });
  }

  updateOffer(id: string, offer: IOffer): Observable<IOffer> {
    return this.http.put<IOffer>(`${this.apiUrl}/${id}`, offer, {
      withCredentials: true,
    });
  }

  deleteOffer(id: string, companyId: string): Observable<void> {
    const params = new HttpParams().set('companyId', companyId);

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      params,
      withCredentials: true,
    });
  }
}
