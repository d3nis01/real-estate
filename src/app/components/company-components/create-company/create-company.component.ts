import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company-service/company.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent implements OnInit {
  companyForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;
  existingCompany: any = null;
  isEditing = false; 
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.companyForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
      ],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      profilePicture: ['', Validators.maxLength(2048)],
      userId: [''], 
    });
  }

  ngOnInit(): void {
    this.fetchUserId();
  }

  fetchUserId(): void {
    this.authService.getCurrentUser().subscribe({
      next: (response) => {
        const userId = response.userId;
        this.companyForm.patchValue({ userId });
        this.checkIfCompanyExists(userId);
      },
      error: () => {
        this.snackBar.open(
          'Failed to fetch User ID. Please try again.',
          'Close',
          { duration: 3000 }
        );
        this.router.navigate(['/']);
      },
    });
  }

  checkIfCompanyExists(userId: string): void {
    this.companyService.getCompanyByUserId(userId).subscribe({
      next: (company) => {
        this.existingCompany = company;
      },
      error: () => {
        this.existingCompany = null;
      },
    });
  }

  editCompany(): void {
    this.isEditing = true;
    this.companyForm.patchValue(this.existingCompany);
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      const formValue = this.companyForm.value;

      if (this.isEditing) {
        if (!this.existingCompany || !this.existingCompany.id) {
          this.isSubmitting = false;
          this.snackBar.open(
            'Error: Existing company ID is missing. Cannot update.',
            'Close',
            { duration: 3000 }
          );
          return;
        }

        const updatedData = {
          ...formValue,
          id: this.existingCompany.id, 
        };

        this.companyService
          .updateCompany(this.existingCompany.id, updatedData)
          .subscribe({
            next: () => {
              this.isSubmitting = false;
              this.snackBar.open('Company updated successfully!', 'Close', {
                duration: 3000,
              });
              this.isEditing = false;
              this.checkIfCompanyExists(formValue.userId); 
            },
            error: (errorResponse) => {
              this.isSubmitting = false;
              this.errorMessage =
                errorResponse.error?.message || 'An error occurred.';
              this.snackBar.open(
                this.errorMessage || 'An error occurred.',
                'Close',
                { duration: 3000 }
              );
            },
          });
      } else {
        this.companyService.createCompany(formValue).subscribe({
          next: () => {
            this.isSubmitting = false;
            this.snackBar.open('Company created successfully!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/get-all-companies']);
          },
          error: (errorResponse) => {
            this.isSubmitting = false;
            this.errorMessage =
              errorResponse.error?.message || 'An error occurred.';
            this.snackBar.open(
              this.errorMessage || 'An error occurred.',
              'Close',
              { duration: 3000 }
            );
          },
        });
      }
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
      this.snackBar.open(this.errorMessage, 'Close', { duration: 3000 });
    }
  }

  goToAllCompanies(): void {
    this.router.navigate(['/get-all-companies']);
  }
}
