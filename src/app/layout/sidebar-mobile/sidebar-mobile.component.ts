import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-mobile.component.html',
  styleUrls: ['./sidebar-mobile.component.css'],
})
export class SidebarMobileComponent {
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closeSidebar() {
    this.close.emit();
  }

  goToCreateUser() {
    this.router.navigate(['/create-user']);
    this.closeSidebar();
  }

  goToGetAllUsers() {
    this.router.navigate(['/get-all-users']);
    this.closeSidebar();
  }

  goToCreateCompany() {
    this.router.navigate(['/create-company']);
    this.closeSidebar();
  }

  goToGetAllCompanies() {
    this.router.navigate(['/get-all-companies']);
    this.closeSidebar();
  }

  goToCreateListing() {
    this.router.navigate(['/create-listing']);
    this.closeSidebar();
  }

  goToGetAllListings() {
    this.router.navigate(['/get-all-listings']);
    this.closeSidebar();
  }

  goToPredictionPage() {
    this.router.navigate(['/price-prediction']);
    this.closeSidebar();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
