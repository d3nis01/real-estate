import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictionService {
  private baseUrl = 'http://localhost:5213/api/v1/PropertyPricePrediction';

  constructor(private http: HttpClient) {}

  predict(data: {
    date: string;
    countryCode: string;
    country: string;
  }): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/predict`, data, {
      withCredentials: true,
    });
  }

  train(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/train`, {});
  }
}
