import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OfferService } from '../../../services/offer-service/offer.service';
import { CompanyService } from '../../../services/company-service/company.service';
import { IOffer } from '../../../models/offer';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-create-offer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css'],
})
export class CreateOfferComponent implements OnInit {
  offerForm: FormGroup;
  isSubmitting = false;
  listingId: string | null = null;

  offerStatusOptions = ['Pending', 'Accepted', 'Rejected'];
  companyId: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private offerService: OfferService,
    private companyService: CompanyService,
    private authService: AuthService
  ) {
    this.offerForm = this.fb.group({
      price: ['', [Validators.required, Validators.min(0.01)]],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ],
      ],
      offerDocument: ['', Validators.maxLength(2048)],
      deadline: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listingId = params.get('listingId');
      if (!this.listingId) {
        this.snackBar.open('Listing ID is missing!', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      }
    });

    this.fetchCompanyId();
  }

  private fetchCompanyId(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        const userId = user?.userId;
        if (userId) {
          this.companyService.getCompanyByUserId(userId).subscribe({
            next: (company) => {
              this.companyId = company.id;
            },
            error: () => {
              this.snackBar.open(
                'Failed to fetch company information.',
                'Close',
                {
                  duration: 3000,
                }
              );
              this.router.navigate(['/']); 
            },
          });
        }
      },
      error: () => {
        this.snackBar.open('Failed to fetch user information.', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/']); 
      },
    });
  }

  onSubmit(): void {
    if (this.offerForm.valid && this.listingId && this.companyId) {
      this.isSubmitting = true;

      const offerData: IOffer = {
        ...this.offerForm.value,
        listingId: this.listingId,
        companyId: this.companyId, 
        createdAt: new Date().toISOString(), 
        deadline: new Date(this.offerForm.value.deadline).toISOString(), 
      };

      this.offerService.createOffer(offerData).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.snackBar.open('Offer created successfully!', 'Close', {
            duration: 3000,
          });

          this.router.navigate(['/listing', this.listingId]);
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Error creating offer:', err);
          this.snackBar.open(
            'Failed to create offer. Try again later.',
            'Close',
            {
              duration: 3000,
            }
          );
        },
      });
    } else {
      this.snackBar.open('Please fix the errors in the form.', 'Close', {
        duration: 3000,
      });
    }
  }

  goToAllOffers(): void {
    this.router.navigate(['/get-all-offers']);
  }

  goToListingPage(): void {
    if (this.listingId) {
      this.router.navigate(['/listing', this.listingId]);
    }
  }
}
