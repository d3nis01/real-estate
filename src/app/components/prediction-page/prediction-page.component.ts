import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PredictionService } from '../../services/prediction-service/prediction.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-prediction-page',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSnackBarModule, // Add Snackbar Module
  ],
  templateUrl: './prediction-page.component.html',
  styleUrls: ['./prediction-page.component.css'],
})
export class PredictionPageComponent {
  country: string = '';
  countrycode: string = 'RO';
  date: string = '';
  predictionResult: string | null = null;

  constructor(
    private predictionService: PredictionService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  private formatDate(date: string): string {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (!this.country || !this.countrycode || !this.date) {
      this.openSnackBar('Please fill in all fields.', 'Close'); // Show snackbar
      return;
    }

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
        this.openSnackBar(
          'An error occurred while fetching the prediction.',
          'Close'
        ); // Show snackbar on error
        console.error(err);
      },
    });
  }

  clearForm(): void {
    this.country = '';
    this.countrycode = '';
    this.date = '';
    this.predictionResult = null;
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000, // Snackbar duration in milliseconds
      verticalPosition: 'bottom', // Position at the top
      horizontalPosition: 'center', // Center horizontally
    });
  }
}
