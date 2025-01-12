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

  /**
   * Create a new company
   * @param company Company data
   * @returns Observable<ICompany> Created company
   */
  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.baseUrl}`, company, {
      withCredentials: true,
    });
  }

  /**
   * Get all companies with optional pagination and sorting
   * @param pageNumber Current page number (default: 1)
   * @param pageSize Number of items per page (default: 10)
   * @param sortProperty Property to sort by (optional)
   * @param isDescending Whether sorting is descending (default: false)
   * @returns Observable<{ items: ICompany[]; totalCount: number }>
   */
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

  /**
   * Get a company by its ID
   * @param id Company ID
   * @returns Observable<ICompany> Company details
   */
  getCompanyById(id: string): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.baseUrl}/${id}`, {
      withCredentials: true,
    });
  }

  /**
   * Get a company by the user's ID
   * @param userId User ID
   * @returns Observable<ICompany> Company details
   */
  getCompanyByUserId(userId: string): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.baseUrl}/User/${userId}`, {
      withCredentials: true,
    });
  }

  /**
   * Update an existing company
   * @param id Company ID
   * @param company Updated company data
   * @returns Observable<ICompany> Updated company
   */
  updateCompany(id: string, company: ICompany): Observable<ICompany> {
    return this.http.put<ICompany>(`${this.baseUrl}/${id}`, company, {
      withCredentials: true,
    });
  }

  /**
   * Delete a company
   * @param id Company ID
   * @param userId User ID associated with the company
   * @returns Observable<void> Indicates success of deletion
   */
  deleteCompany(id: string, userId: string): Observable<void> {
    const params = new HttpParams().set('userId', userId);
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { params });
  }

  doesUserHaveCompany(id: string) {
    return this.getCompanyByUserId(id) ? true : false;
  }
}
