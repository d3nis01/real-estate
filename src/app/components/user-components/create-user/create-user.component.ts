import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserType } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  userTypeOptions = Object.values(UserType).filter(
    (value) => typeof value === 'string'
  );
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
      ],
      city: ['', [Validators.required, Validators.maxLength(100)]],
      country: ['', [Validators.required, Validators.maxLength(100)]],
      userType: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = null;

      this.userService.createUser(this.userForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/get-all-users']); // Navigate to the list of users
        },
        error: (errorResponse) => {
          this.isSubmitting = false;
          if (errorResponse.error && errorResponse.error.validationErrors) {
            errorResponse.error.validationErrors.forEach((error: string) => {
              if (error.includes('Username')) {
                this.userForm.get('username')?.setErrors({ unique: true });
              }
            });
          } else {
            this.errorMessage =
              errorResponse.error?.title || 'An error occurred.';
          }
        },
      });
    } else {
      this.errorMessage = 'Please fix the errors in the form.';
    }
  }

  goToAllUsers(): void {
    this.router.navigate(['/get-all-users']);
  }
}
