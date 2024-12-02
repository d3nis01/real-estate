import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { UpdateUserComponent } from './update-user.component';
import { UserService } from '../../services/user-service/user.service';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Provides HttpClient for testing
        RouterTestingModule, // Provides router functionality
        ReactiveFormsModule, // Required for reactive forms
        CommonModule, // Required for *ngIf and *ngFor directives
        UpdateUserComponent, // Import the standalone component
      ],
      providers: [UserService], // Provide the UserService mock or service
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
