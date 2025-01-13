import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ListingService } from '../../services/listing-service/listing.service';
import { AuthService } from '../../services/auth-service/auth.service';
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
  totalItems = 0; 
  pageSize = 10; 
  currentPage = 0; 
  isLoggedIn = false; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private listingService: ListingService,
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.fetchListings();
  }

  private checkLoginStatus(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.isLoggedIn = !!user;
      },
      error: () => {
        this.isLoggedIn = false;
      },
    });
  }

  fetchListings(): void {
    this.listingService
      .getAllListings(this.currentPage + 1, this.pageSize)
      .subscribe({
        next: (response) => {
          this.listings = response.items;
          this.totalItems = response.totalCount; 
        },
        error: (error) => {
          console.error('Failed to fetch listings:', error);
        },
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchListings(); 
  }

  viewDetails(id: string): void {
    this.router.navigate([`/listing/${id}`]);
  }

  goToCreateListing(): void {
    this.router.navigate(['/create-listing']);
  }
}
