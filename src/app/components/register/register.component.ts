import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  username: any;
  email: any;
  city: any;
  password: any;
  confirmPassword: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.strongPasswordValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        city: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  private strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value?.trim();

      if (!password) {
        return null;
      }

      const strongPasswordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

      return strongPasswordPattern.test(password)
        ? null
        : { strongPassword: true };
    };
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
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
      error: () => {
        this.isSubmitting = false;
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
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
