import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ListingService } from './listing.service';
import { Listing, ListingStatus } from '../../models/listing';
import { environment } from '../../../environments/environment';

describe('ListingService', () => {
  let service: ListingService;
  let httpMock: HttpTestingController;

  const mockListing: Listing = {
    id: '1',
    title: 'Test Listing',
    description: 'A test description',
    projectType: 'Residential',
    city: 'New York',
    country: 'USA',
    blueprint: 'blueprint.pdf',
    image: 'image.jpg',
    budget: 100000,
    status: ListingStatus.Open,
    constructionDeadline: new Date(new Date().setDate(new Date().getDate() + 30)),
    createdAt: new Date(),
    userId: 'user123',
  };

  const baseUrl = environment.apiUrl + '/listings';
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ListingService],
    });
    service = TestBed.inject(ListingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a listing', () => {
    service.createListing(mockListing).subscribe(listing => {
      expect(listing).toEqual(mockListing);
    });

    const req = httpMock.expectOne(`${baseUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockListing);
    req.flush(mockListing);
  });

  it('should fetch a listing by ID', () => {
    service.getListingById(mockListing.id).subscribe(listing => {
      expect(listing).toEqual(mockListing);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockListing.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockListing);
  });

  it('should update a listing', () => {
    const updatedListing: Listing = { ...mockListing, title: 'Updated Listing' };

    service.updateListing(mockListing.id, updatedListing).subscribe(listing => {
      expect(listing).toEqual(updatedListing);
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockListing.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedListing);
    req.flush(updatedListing);
  });

  it('should delete a listing by ID', () => {
    service.deleteListing(mockListing.id).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${baseUrl}/${mockListing.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); 
  });
});
