import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOffer } from '../../models/offer';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private apiUrl = environment.apiUrl + '/offers';

  constructor(private http: HttpClient) {}

  createOffer(offer: IOffer): Observable<IOffer> {
    return this.http.post<IOffer>(`${this.apiUrl}`, offer);
  }

  getAllOffers(): Observable<IOffer[]> {
    return this.http.get<IOffer[]>(`${this.apiUrl}`);
  }

  // getAllOffersByCompanyId(companyId: string): Observable<IOffer[]> {
  //   return this.http.get<IOffer[]>(`${this.apiUrl}/Companies/${companyId}`);
  // }

  getOfferById(id: string): Observable<IOffer> {
    return this.http.get<IOffer>(`${this.apiUrl}/${id}`);
  }

  updateOffer(id: string, offer: IOffer): Observable<IOffer> {
    return this.http.put<IOffer>(`${this.apiUrl}/${id}`, offer);
  }

  deleteOffer(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
