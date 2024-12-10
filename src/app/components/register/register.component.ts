import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        city: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Custom validator for password confirmation
  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Handle form submission
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage =
        'Please fix the errors in the form before submitting.';
      return;
    }

    this.isSubmitting = true;
    this.successMessage = null;
    this.errorMessage = null;

    const { username, email, password, city } = this.registerForm.value;

    this.authService.register({ username, email, password, city }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = 'Registration successful! Please log in.';
         this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage =
          err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }

  // Getter for form controls (for easier access in the template)
  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
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
}
