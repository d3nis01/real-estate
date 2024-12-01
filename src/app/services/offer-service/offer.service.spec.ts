import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OfferService } from './offer.service';
import { IOffer, OfferStatus } from '../../models/offer';
import { environment } from '../../../environments/environment';

describe('OfferService', () => {
  let service: OfferService;
  let httpMock: HttpTestingController;

  const mockOffer: IOffer = {
    id: '1',
    price: 1000,
    description: 'Test Offer',
    offerDocument: 'test-document.pdf',
    createdAt: new Date(),
    deadline: new Date(new Date().setDate(new Date().getDate() + 7)),
    status: OfferStatus.Pending,
    listingId: '123',
    companyId: '456',
  };

  const apiUrl = environment.apiUrl + '/offers';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OfferService],
    });

    service = TestBed.inject(OfferService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an offer', () => {
    service.createOffer(mockOffer).subscribe(offer => {
      expect(offer).toEqual(mockOffer);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockOffer);
    req.flush(mockOffer); // Simulate the API response
  });

  it('should fetch all offers', () => {
    const mockOffers: IOffer[] = [mockOffer];

    service.getAllOffers().subscribe(offers => {
      expect(offers).toEqual(mockOffers);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOffers);
  });

  // it('should fetch all offers by company ID', () => {
  //   const companyId = mockOffer.companyId;
  //   const mockOffers: IOffer[] = [mockOffer];

  //   // service.getAllOffersByCompanyId(companyId).subscribe(offers => {
  //   //   expect(offers).toEqual(mockOffers);
  //   // });

  //   const req = httpMock.expectOne(`${apiUrl}/companies/${companyId}`);
  //   expect(req.request.method).toBe('GET');
  //   req.flush(mockOffers);
  // });

  it('should fetch an offer by ID', () => {
    const offerId = mockOffer.id;

    service.getOfferById(offerId).subscribe(offer => {
      expect(offer).toEqual(mockOffer);
    });

    const req = httpMock.expectOne(`${apiUrl}/${offerId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOffer);
  });

  it('should update an offer', () => {
    const updatedOffer: IOffer = { ...mockOffer, price: 1200 };

    service.updateOffer(mockOffer.id, updatedOffer).subscribe(offer => {
      expect(offer).toEqual(updatedOffer);
    });

    const req = httpMock.expectOne(`${apiUrl}/${mockOffer.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedOffer);
    req.flush(updatedOffer);
  });

  it('should delete an offer by ID', () => {
    const offerId = mockOffer.id;

    service.deleteOffer(offerId).subscribe(response => {
      expect(response).toBeNull(); // Expect null because the API returns 204 No Content
    });

    const req = httpMock.expectOne(`${apiUrl}/${offerId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate no response body (204 No Content)
  });
});
