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
    httpMock.verify(); 
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
    req.flush(mockOffer); 

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
});});
