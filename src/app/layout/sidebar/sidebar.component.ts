import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  isDrawerOpen: boolean = false;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  goToCreateUser() {
    this.router.navigate(['/create-user']);
  }

  goToGetAllUsers() {
    this.router.navigate(['/get-all-users']);
  }

  goToCreateListing() {
    this.router.navigate(['/create-listing']);
  }

  goToGetAllListings() {
    this.router.navigate(['/get-all-listings']);
  }

  goToPredictionPage() {
    this.router.navigate(['/price-prediction']);
  }

  goToGetAllCompanies() {
    this.router.navigate(['/get-all-companies']);
  }

  goToCreateCompany() {
    this.router.navigate(['/create-company']);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
