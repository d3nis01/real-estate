import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsListingComponent } from './details-listing.component';

describe('DetailsListingComponent', () => {
  let component: DetailsListingComponent;
  let fixture: ComponentFixture<DetailsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
