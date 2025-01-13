import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing-service/listing.service';
import { AuthService } from '../../../services/auth-service/auth.service'; // Import AuthService
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-get-user-listings',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './get-user-listings.component.html',
  styleUrls: ['./get-user-listings.component.css'],
})
export class GetUserListingsComponent implements OnInit {
  listings: Listing[] = [];
  totalItems = 0; 
  pageSize = 10;
  currentPage = 0; 

  constructor(
    private listingService: ListingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCurrentUserListings();
  }

  fetchCurrentUserListings(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        const userId = user.userId;
        this.fetchListingsByUserId(userId);
      },
      error: () => {
        console.error('Failed to fetch current user');
        this.router.navigate(['/login']); 
      },
    });
  }

  fetchListingsByUserId(userId: string): void {
    this.listingService.getListingsByUserId(userId).subscribe({
      next: (response) => {
        this.listings = response;
      },
      error: (err) => {
        console.error('Failed to fetch user listings:', err);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchCurrentUserListings();
  }

  viewDetails(id: string): void {
    this.router.navigate([`/listing/${id}`]);
  }

  goToCreateListing(): void {
    this.router.navigate(['/create-listing']);
  }
}
