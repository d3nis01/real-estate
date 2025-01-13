import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgIf,
  NgFor,
  CommonModule,
  DatePipe,
  DecimalPipe,
} from '@angular/common';
import { ListingService } from '../../../services/listing-service/listing.service';
import { Listing } from '../../../models/listing';
import { CompanyService } from '../../../services/company-service/company.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth-service/auth.service';

@Component({
  selector: 'app-listing-page',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, DatePipe, DecimalPipe, MatButtonModule],
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css'],
})
export class ListingPageComponent implements OnInit {
  listing: Listing | null = null;
  userHasCompany = false; // To track if the user has a company
  ownsListing = false; // To track if the logged-in user owns the listing

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private listingService: ListingService,
    private companyService: CompanyService // Inject CompanyService
  ) {}

  ngOnInit(): void {
    this.loadListing();
  }

  /**
   * Fetch the listing details based on the ID from the URL
   */
  private loadListing(): void {
    const listingId = this.route.snapshot.paramMap.get('id');
    if (listingId) {
      this.listingService.getListingById(listingId).subscribe({
        next: (listing) => {
          this.listing = listing;
          this.checkUserAccess();
        },
        error: (err) => {
          console.error('Failed to fetch listing:', err);
        },
      });
    }
  }

  /**
   * Check if the user owns the listing or has a company
   */
  private checkUserAccess(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        const userId = user?.userId;
        if (userId) {
          // Check if the user owns the listing
          this.ownsListing = this.listing?.userId === userId;

          // Check if the user has a company
          this.companyService.getCompanyByUserId(userId).subscribe({
            next: () => {
              this.userHasCompany = true;
            },
            error: () => {
              this.userHasCompany = false;
            },
          });
        }
      },
      error: () => {
        this.userHasCompany = false;
        this.ownsListing = false;
      },
    });
  }

  goToOfferPage(): void {
    if (this.listing) {
      this.router.navigate([`/create-offer/${this.listing.id}`]);
    }
  }

  goToAllOffers(): void {
    if (this.listing) {
      this.router.navigate([`/all-offers/${this.listing.id}`]);
    }
  }
}
