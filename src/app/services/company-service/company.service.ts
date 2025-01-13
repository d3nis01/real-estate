import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../../models/company';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.apiUrl + '/Companies';

  constructor(private http: HttpClient) {}

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.baseUrl}`, company, {
      withCredentials: true,
    });
  }

  getAllCompanies(
    pageNumber: number = 1,
    pageSize: number = 10,
    sortProperty: string = '',
    isDescending: boolean = false
  ): Observable<{ items: ICompany[]; totalCount: number }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString())
      .set('isDescending', isDescending.toString());

    if (sortProperty) {
      params = params.set('sortProperty', sortProperty);
    }

    return this.http.get<{ items: ICompany[]; totalCount: number }>(
      `${this.baseUrl}`,
      { params, withCredentials: true }
    );
  }

  getCompanyById(id: string): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  getCompanyByUserId(userId: string): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.baseUrl}/User/${userId}`, {
      withCredentials: true,
    });
  }

  updateCompany(id: string, company: ICompany): Observable<ICompany> {
    return this.http.put<ICompany>(`${this.baseUrl}/${id}`, company, {
      withCredentials: true,
    });
  }

  deleteCompany(id: string, userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { params });
  }

  doesUserHaveCompany(id: string) {
    return this.getCompanyByUserId(id) ? true : false;
  }
}
