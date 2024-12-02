import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { IUser, UserType } from '../../models/user';
import { environment } from '../../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUser: IUser = {
    id: '1',
    username: 'john_doe',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    city: 'New York',
    country: 'USA',
    userType: UserType.Buyer,
  };

  const mockPaginatedResponse = {
    items: [mockUser],
    totalCount: 1,
  };

  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch paginated users', () => {
    const pageNumber = 1;
    const pageSize = 10;

    service.getAllUsers(pageNumber, pageSize).subscribe((response) => {
      expect(response).toEqual(mockPaginatedResponse);
      expect(response.items.length).toBe(1);
      expect(response.totalCount).toBe(1);
    });

    const req = httpMock.expectOne(
      `${baseUrl}/Users?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPaginatedResponse);
  });

  it('should fetch a user by ID', () => {
    service.getUserById(mockUser.id).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/Users/${mockUser.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should create a new user', () => {
    service.createUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/Users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

  it('should update a user', () => {
    service.updateUser(mockUser.id, mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${baseUrl}/Users/${mockUser.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockUser);
  });

  it('should delete a user by ID', () => {
    service.deleteUser(mockUser.id).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/Users/${mockUser.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
