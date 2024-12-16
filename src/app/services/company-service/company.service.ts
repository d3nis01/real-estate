import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../../models/company';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private baseUrl = environment.apiUrl + '/companies';

  constructor(private http: HttpClient) {}

  createCompany(company: ICompany): Observable<ICompany> {
    return this.http.post<ICompany>(`${this.baseUrl}`, company);
  }

  getAllCompanies(
    pageNumber: number,
    pageSize: number
  ): Observable<{ items: ICompany[]; totalCount: number }> {
    return this.http.get<{ items: ICompany[]; totalCount: number }>(
      `${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {
        withCredentials: true,
      }
    );
  }

  getCompanyById(id: string): Observable<ICompany> {
    return this.http.get<ICompany>(`${this.baseUrl}/${id}`);
  }

  updateCompany(id: string, company: ICompany): Observable<ICompany> {
    return this.http.put<ICompany>(`${this.baseUrl}/${id}`, company);
  }

  deleteCompany(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
