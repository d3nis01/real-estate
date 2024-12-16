import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  predictionResult: string | null = null;
  error: string | null = null;

  onSubmit(): void {
    if (!this.country || !this.countrycode) {
      this.error = 'Please fill in both fields.';
      this.predictionResult = null; // Clear prediction if there's an error
      return;
    }

    // Clear the error and set the prediction result
    this.error = null;
    this.predictionResult = `Predicted price for ${this.country} (${this.countrycode}) is $123.45`;
  }

  // Clear form and reset all fields
  clearForm(): void {
    this.country = '';
    this.countrycode = '';
    this.predictionResult = null;
    this.error = null; // Clear any existing error
  }
}
