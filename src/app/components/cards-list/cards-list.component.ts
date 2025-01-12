import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing-service/listing.service';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [MatButtonModule, CommonModule, MatPaginatorModule],
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css'],
})
export class CardsListComponent implements OnInit {
  listings: Listing[] = [];
  totalItems = 0; // Total number of items from the backend
  pageSize = 10; // Number of items per page
  currentPage = 0; // Current page index

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchListings();
  }

  /**
   * Fetch listings based on the current page and page size
   */
  fetchListings(): void {
    this.listingService
      .getAllListings(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (response) => {
          this.listings = response.items;
          this.totalItems = response.totalCount; // Update the total number of items
        },
        error: (error) => {
          console.error('Failed to fetch listings:', error);
        },
      });
  }

  /**
   * Handle page change events from the paginator
   * @param event PageEvent
   */
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchListings(); // Fetch new data when the page changes
  }

  /**
   * Navigate to the listing details page
   * @param id - Listing ID
   */
  viewDetails(id: string): void {
    this.router.navigate([`/listing/${id}`]);
  }

  goToCreateListing(): void {
    this.router.navigate(['/create-listing']);
  }
}
