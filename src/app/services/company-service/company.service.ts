import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../../models/company';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.apiUrl + '/companies'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  /**
   * Create a new company
   * @param company - Company data
   * @returns Observable<ICompany> - Created company
   */
  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.baseUrl}`, company);
  }

  /**
   * Fetch all companies
   * @returns Observable<ICompany[]> - List of all companies
   */
  getAllCompanies(): Observable<ICompany[]> {
    return this.http.get<ICompany[]>(`${this.baseUrl}`);
  }

  /**
   * Fetch a company by ID
   * @param id - Company ID
   * @returns Observable<ICompany> - Company details
   */
  getCompanyById(id: string): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update a company
   * @param id - Company ID
   * @param company - Updated company data
   * @returns Observable<ICompany> - Updated company
   */
  updateCompany(id: string, company: ICompany): Observable<ICompany> {
    return this.http.put<ICompany>(`${this.baseUrl}/${id}`, company);
  }

  /**
   * Delete a company
   * @param id - Company ID
   * @returns Observable<void> - Indicates success of deletion
   */
  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
