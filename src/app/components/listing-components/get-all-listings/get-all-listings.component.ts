import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Listing } from '../../../models/listing';
import { ListingService } from '../../../services/listing-service/listing.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-listings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-listings.component.html',
  styleUrls: ['./get-all-listings.component.css'],
})
export class GetAllListingsComponent implements OnInit {
  listings: Listing[] = [];
  paginatedListings: Listing[] = [];
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAllListings();
  }

  // Fetch all listings
  fetchAllListings(): void {
    this.listingService.getAllListings(1, 100).subscribe((response) => {
      this.listings = response.items;
      this.reinitializePagination();
    });
  }

  // Fetch listings filtered by date (ascending)
  filterByDate(): void {
    this.listingService.getAllListingsByDateAscending().subscribe((data) => {
      this.listings = data; // Update listings with filtered data
      console.log(this.listings);
      this.reinitializePagination(); // Reset pagination
    });
  }

  // Fetch listings filtered by budget (ascending)
  filterByBudget(): void {
    this.listingService.getAllListingsByBudgetAscending().subscribe((data) => {
      this.listings = data; // Update listings with filtered data
      this.reinitializePagination(); // Reset pagination
    });
  }

  // Reinitialize pagination
  reinitializePagination(): void {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.listings.length / this.pageSize);
    this.paginateListings();
  }

  // Paginate the listings
  paginateListings(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedListings = this.listings.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  // Navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateListings();
    }
  }

  // Navigate to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateListings();
    }
  }

  // Navigate to view listing details
  viewListing(id: string): void {
    this.router.navigate([`/listing/${id}`]);
  }

  // Navigate back to the dashboard
  goToGetAllUsers(): void {
    this.router.navigate(['']);
  }
  goToCreateListing(): void {
    this.router.navigate(['/create-listing']);
  }
}
