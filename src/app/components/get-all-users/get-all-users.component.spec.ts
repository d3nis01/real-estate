import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GetAllUsersComponent } from './get-all-users.component';
import { UserService } from '../../services/user-service/user.service';

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
});
