import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user.component';
import { UserService } from '../../services/user-service/user.service';
import { throwError } from 'rxjs';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        CreateUserComponent,
      ],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit when the form is valid', () => {
    spyOn(component, 'onSubmit');
    component.userForm.controls['username'].setValue('validUsername');
    component.userForm.controls['password'].setValue('ValidPass123');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.userForm.controls['username'].setValue('');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['phoneNumber'].setValue('');
    expect(component.userForm.invalid).toBeTrue();
  });

  it('should navigate to user list when goToAllUsers is called', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToAllUsers();
    expect(routerSpy).toHaveBeenCalledWith(['/get-all-users']);
  });

  it('should disable the submit button when the form is invalid', () => {
    component.userForm.controls['username'].setValue('');
    fixture.detectChanges();
    const button =
      fixture.debugElement.nativeElement.querySelector('.btn-submit');
    expect(button.disabled).toBeTrue();
  });

  it('should reset isSubmitting to false if an error occurs during submission', () => {
    const errorResponse = {
      error: {
        title: 'An error occurred.',
      },
    };
    spyOn(component['userService'], 'createUser').and.returnValue(
      throwError(errorResponse)
    );
    component.userForm.controls['username'].setValue('newUser');
    component.onSubmit();
    expect(component.isSubmitting).toBeFalse();
  });
});
