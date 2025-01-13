import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOffer } from '../../../models/offer';
import { OfferService } from '../../../services/offer-service/offer.service';
import { CompanyService } from '../../../services/company-service/company.service';
import { ListingService } from '../../../services/listing-service/listing.service'; 
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { OfferDetailsDialogComponent } from '../../offer-details-dialog/offer-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-get-all-offers',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
  ],
  templateUrl: './get-all-offers.component.html',
  styleUrls: ['./get-all-offers.component.css'],
})
export class GetAllOffersComponent implements OnInit {
  displayedColumns: string[] = ['companyName', 'deadline', 'price', 'actions'];
  offers: IOffer[] = [];
  totalCount = 0;
  pageSize = 10; 
  pageIndex = 0; 
  listingId: string | null = null;
  listingName: string = ''; 

  constructor(
    private offerService: OfferService,
    private companyService: CompanyService,
    private listingService: ListingService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.listingId = params.get('listingId');
      if (this.listingId) {
        this.fetchListingName();
        this.loadOffers();
      } else {
        console.error('Listing ID is missing.');
        this.router.navigate(['/']);
      }
    });
  }

  fetchListingName(): void {
    if (!this.listingId) return;
    this.listingService.getListingById(this.listingId).subscribe({
      next: (listing) => {
        this.listingName = listing.title;
      },
      error: (err) => {
        console.error('Error fetching listing:', err);
        this.listingName = 'Unknown Listing';
      },
    });
  }

  loadOffers(): void {
    if (!this.listingId) return;

    this.offerService
      .getAllOffersByListingId(this.listingId)
      .subscribe((offers) => {
        const offersWithCompany: Promise<IOffer>[] = offers.map(
          async (offer) => {
            try {
              const company = await this.companyService
                .getCompanyById(offer.companyId)
                .toPromise();
              return { ...offer, companyName: company?.name || 'Unknown' };
            } catch (error) {
              console.error('Error fetching company:', error);
              return { ...offer, companyName: 'Unknown' };
            }
          }
        );

        Promise.all(offersWithCompany).then((result) => {
          this.offers = result;
          this.totalCount = result.length;
        });
      });
  }

  goBackToListing(): void {
    this.router.navigate(['/listing', this.listingId]);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.offers = [...this.offers.slice(startIndex, endIndex)];
  }

  openOfferDetails(offerId: string): void {
    this.offerService.getOfferById(offerId).subscribe((offer) => {
      const dialogRef = this.dialog.open(OfferDetailsDialogComponent, {
        width: '400px',
        data: offer,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result?.deleted) {
          this.loadOffers();
        }
      });
    });
  }
}
