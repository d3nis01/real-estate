import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PredictionService } from '../../services/prediction-service/prediction.service';

@Component({
  selector: 'app-prediction-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prediction-page.component.html',
  styleUrls: ['./prediction-page.component.css'],
})
export class PredictionPageComponent {
  country: string = '';
  countrycode: string = '';
  date: string = ''; // User-provided date
  predictionResult: string | null = null;
  error: string | null = null;

  constructor(private predictionService: PredictionService) {}

  private formatDate(date: string): string {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (!this.country || !this.countrycode || !this.date) {
      this.error = 'Please fill in all fields.';
      this.predictionResult = null;
      return;
    }

    this.error = null;

    const requestData = {
      date: this.formatDate(this.date),
      countryCode: this.countrycode,
      country: this.country,
    };

    this.predictionService.predict(requestData).subscribe({
      next: (result) => {
        this.predictionResult = `Predicted growth for ${
          this.country
        } is ${result.toFixed(2)}% compared to the previous year.`;
      },
      error: (err) => {
        this.error = 'An error occurred while fetching the prediction.';
        console.error(err);
      },
    });
  }

  clearForm(): void {
    this.country = '';
    this.countrycode = '';
    this.date = '';
    this.predictionResult = null;
    this.error = null;
  }
}
