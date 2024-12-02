import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { IUser, UserType } from '../../models/user';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  userForm: FormGroup;
  userTypeOptions = Object.values(UserType).filter(
    (value) => typeof value === 'string'
  );
  isSubmitting = false;
  errorMessage: string | null = null;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe({
        next: (user: IUser) => {
          this.userForm.patchValue(user);
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
          this.errorMessage = 'Failed to load user data.';
        },
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid && this.userId) {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.userForm.value.id = this.userId;

      this.userService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/get-all-users']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'Failed to update user. Please try again.';
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
    } else {
      this.errorMessage =
        'Please fix the errors in the form before submitting.';
    }
  }
}
