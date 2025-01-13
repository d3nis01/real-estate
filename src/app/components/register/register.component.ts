import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth-service/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern(/^\d{5,20}$/)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.strongPasswordValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        city: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value?.trim();
      if (!password) return null;

      const strongPasswordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      return strongPasswordPattern.test(password)
        ? null
        : { strongPassword: true };
    };
  }

  private passwordsMatchValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get city() {
    return this.registerForm.get('city');
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fix the errors in the form.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar',
      });
      return;
    }

    this.isSubmitting = true;

    const { username, email, password, city } = this.registerForm.value;

    this.authService.register({ username, email, password, city }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.snackBar.open('Registration successful! Please log in.', 'Close', {
          duration: 3000,
          panelClass: 'success-snackbar',
        });
        this.router.navigate(['/login']);
      },
      error: (errorResponse) => {
        this.isSubmitting = false;

        const errorMessage =
          errorResponse.error?.validationErrors?.join(', ') ||
          errorResponse.error?.title ||
          'Registration failed. Please try again.';
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
          panelClass: 'error-snackbar',
        });
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
