import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetAllUsersComponent } from './get-all-users.component';
import { UserService } from '../../services/user-service/user.service';
import { throwError } from 'rxjs';

describe('GetAllUsersComponent', () => {
  let component: GetAllUsersComponent;
  let fixture: ComponentFixture<GetAllUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, GetAllUsersComponent],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(GetAllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create user page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.goToCreateUser();
    expect(routerSpy).toHaveBeenCalledWith(['/create-user']);
  });

  it('should disable the next button on the last page', () => {
    component.pageNumber = 2;
    component.pageSize = 10;
    component.totalCount = 20;

    fixture.detectChanges();

    const nextButton = fixture.debugElement.nativeElement.querySelector(
      '.pagination-button:last-child'
    );
    expect(nextButton.disabled).toBeTrue();
  });

  it('should disable the next button on the last page', () => {
    component.pageNumber = 2;
    component.pageSize = 10;
    component.totalCount = 20;

    fixture.detectChanges();

    const nextButton = fixture.debugElement.nativeElement.querySelector(
      '.pagination-button:last-child'
    );
    expect(nextButton.disabled).toBeTrue();
  });

  it('should disable the previous button on the first page', () => {
    component.pageNumber = 1;

    fixture.detectChanges();

    const previousButton = fixture.debugElement.nativeElement.querySelector(
      '.pagination-button:first-child'
    );
    expect(previousButton.disabled).toBeTrue();
  });

  it('should not display rows if user list is empty', () => {
    component.users = [];
    fixture.detectChanges();

    const rows =
      fixture.debugElement.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });

  it('should not display rows if user list is empty', () => {
    component.users = [];
    fixture.detectChanges();

    const rows =
      fixture.debugElement.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(0);
  });

  it('should not decrease pageNumber below 1', () => {
    component.pageNumber = 1;

    component.previousPage();

    expect(component.pageNumber).toBe(1);
  });

  it('should call goToCreateUser when Create User button is clicked', () => {
    const goToCreateUserSpy = spyOn(component, 'goToCreateUser');
    const button =
      fixture.debugElement.nativeElement.querySelector('.nav-bar a');
    button.click();

    expect(goToCreateUserSpy).toHaveBeenCalled();
  });
});
