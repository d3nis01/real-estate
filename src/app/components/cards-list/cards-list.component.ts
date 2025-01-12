import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing-service/listing.service';
import { Listing } from '../../models/listing';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css'],
})
export class CardsListComponent implements OnInit {
  listings: Listing[] = [];

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit(): void {
    this.fetchListings();
  }

  /**
   * Fetch all listings and populate the cards
   */
  fetchListings(): void {
    this.listingService.getAllListings(1, 10).subscribe({
      next: (response) => {
        this.listings = response.items;
      },
      error: (error) => {
        console.error('Failed to fetch listings:', error);
      },
    });
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
