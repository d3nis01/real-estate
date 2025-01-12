import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailsDialogComponent } from './offer-details-dialog.component';

describe('OffersDetailsDialogComponent', () => {
  let component: OfferDetailsDialogComponent;
  let fixture: ComponentFixture<OfferDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferDetailsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OfferDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
