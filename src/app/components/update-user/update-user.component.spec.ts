import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './update-user.component';
import { UserService } from '../../services/user-service/user.service';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CommonModule,
        UpdateUserComponent,
      ],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid when required fields are empty', () => {
    component.userForm.patchValue({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      city: '',
      country: '',
      userType: '',
    });
    expect(component.userForm.valid).toBeFalse();
  });
});
