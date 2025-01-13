import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ICompany } from '../../models/company';
import { CompanyService } from './company.service';
import { environment } from '../../../environments/environment';

describe('CompanyService', () => {
  let service: CompanyService;
  let httpMock: HttpTestingController;

  const mockCompany: ICompany = {
    id: '1',
    name: 'Test Company',
    email: 'test@example.com',
    phoneNumber: '123456789',
    city: 'New York',
    country: 'USA',
    description: 'A test company description',
    profilePicture: 'profile-pic.jpg',
  };

  const baseUrl = environment.apiUrl + '/companies';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyService],
    });
    service = TestBed.inject(CompanyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a company', () => {
    service.createCompany(mockCompany).subscribe((company: any) => {
      expect(company).toEqual(mockCompany);
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCompany);
    req.flush(mockCompany); 
  });

  it('should fetch all companies', () => {
    const mockCompanies: ICompany[] = [mockCompany];

    service.getAllCompanies().subscribe((companies: any) => {
      expect(companies).toEqual(mockCompanies);
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompanies);
  });

  it('should fetch a company by ID', () => {
    service.getCompanyById(mockCompany.id).subscribe((company: any) => {
      expect(company).toEqual(mockCompany);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockCompany.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCompany);
  });

  it('should update a company', () => {
    const updatedCompany: ICompany = {
      ...mockCompany,
      name: 'Updated Company',
    };

    service
      .updateCompany(mockCompany.id, updatedCompany)
      .subscribe((company: any) => {
        expect(company).toEqual(updatedCompany);
      });

    const req = httpMock.expectOne(`${baseUrl}/${mockCompany.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCompany);
    req.flush(updatedCompany);
  });

  it('should delete a company by ID', () => {
    service.deleteCompany(mockCompany.id, 'id').subscribe((response) => {
      expect(response).toBeNull(); 
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockCompany.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
});
