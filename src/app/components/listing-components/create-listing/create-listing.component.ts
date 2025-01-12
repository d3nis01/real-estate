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
import { AuthService } from '../../../services/auth-service/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-listing',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
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
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private authService: AuthService, // Inject AuthService
    private router: Router,
    private snackBar: MatSnackBar // SnackBar for user feedback
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
      constructionDeadline: ['', [Validators.required]], // Validation on the server will ensure it's in the future
    });
  }

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

  /**
   * Fetch the current user and set the userId
   */
  fetchCurrentUser(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.userId = user.userId;
      },
      error: () => {
        this.errorMessage = 'Failed to fetch user information.';
        this.snackBar.open(this.errorMessage || 'An error occurred.', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  /**
   * Handle form submission
   */
  onSubmit(): void {
    if (this.listingForm.valid && this.userId) {
      this.isSubmitting = true;
      this.errorMessage = null;

      // Transform constructionDeadline to UTC format
      const listingData = {
        ...this.listingForm.value,
        userId: this.userId,
        constructionDeadline: new Date(
          this.listingForm.value.constructionDeadline
        ).toISOString(), // Ensure the date is in ISO UTC format
      };

      this.listingService.createListing(listingData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Listing created successfully!', 'Close', {
            duration: 3000,
          });
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
            this.snackBar.open(
              this.errorMessage || 'An error occurred.',
              'Close',
              {
                duration: 3000,
              }
            );
          }
        },
      });
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      this.snackBar.open(this.errorMessage, 'Close', {
        duration: 3000,
      });
    }
  }

  goToAllListings(): void {
    this.router.navigate(['/get-all-listings']);
  }
}
