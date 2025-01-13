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
import { AuthService } from '../../../services/auth-service/auth.service'; 
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
    private authService: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar 
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
        [Validators.required, Validators.min(0.01)],
      ],
      status: ['', [Validators.required]],
      constructionDeadline: ['', [Validators.required]], 
    });
  }

  ngOnInit(): void {
    this.fetchCurrentUser();
  }

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

  onSubmit(): void {
    if (this.listingForm.valid && this.userId) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const listingData = {
        ...this.listingForm.value,
        userId: this.userId,
        constructionDeadline: new Date(
          this.listingForm.value.constructionDeadline
        ).toISOString(), 
      };

      this.listingService.createListing(listingData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Listing created successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/get-all-listings']); 
        },
        error: (errorResponse) => {
          this.isSubmitting = false;
          if (errorResponse.error && errorResponse.error.validationErrors) {
            errorResponse.error.validationErrors.forEach((error: string) => {
              if (error.includes('Title')) {
                this.listingForm.get('title')?.setErrors({ invalid: true });
              }
            });
          } else {
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
