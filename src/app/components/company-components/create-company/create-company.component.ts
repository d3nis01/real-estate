import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../../services/company-service/company.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-company',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css'],
})
export class CreateCompanyComponent implements OnInit {
  companyForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router
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
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.companyForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      this.companyService.createCompany(this.companyForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/get-all-companies']);
        },
        error: (errorResponse) => {
          this.isSubmitting = false;
          this.errorMessage =
            errorResponse.error?.title || 'An error occurred.';
        },
      });
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
    }
  }

  goToAllCompanies(): void {
    this.router.navigate(['/get-all-companies']);
  }
}
