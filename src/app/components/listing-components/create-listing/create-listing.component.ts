import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ListingStatus } from '../../../models/listing';
import { ListingService } from '../../../services/listing-service/listing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css'],
})
export class CreateListingComponent implements OnInit {
  listingForm: FormGroup;
  listingStatusOptions = Object.values(ListingStatus).filter(
    (value) => typeof value === 'string'
  );
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private router: Router
  ) {
    this.listingForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(20)]],
      projectType: ['', [Validators.required, Validators.maxLength(50)]],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      blueprint: ['', [Validators.maxLength(200)]],
      image: ['', [Validators.maxLength(200)]],
      budget: [
        '',
        [Validators.required, Validators.min(0.01)], // Budget > 0
      ],
      status: ['', [Validators.required]],
      constructionDeadline: [
        '',
        [Validators.required], // Validation on the server will ensure it's in the future
      ],
    });
  }

  ngOnInit(): void {}

  // Handle form submission
  onSubmit(): void {
    if (this.listingForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      this.listingService.createListing(this.listingForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/get-all-listings']); // Navigate to the list of listings
        },
        error: (errorResponse) => {
          this.isSubmitting = false;
          if (errorResponse.error && errorResponse.error.validationErrors) {
            // Handle validation errors and display them in the form
            errorResponse.error.validationErrors.forEach((error: string) => {
              if (error.includes('Title')) {
                this.listingForm.get('title')?.setErrors({ invalid: true });
              }
              // Add other field-specific error handling here if needed
            });
          } else {
            // General error handling
            this.errorMessage =
              errorResponse.error?.title || 'An error occurred.';
          }
        },
      });
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
    }
  }

  goToAllListings(): void {
    this.router.navigate(['/get-all-listings']);
  }
}
