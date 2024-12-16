import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMobileComponent } from '../sidebar-mobile/sidebar-mobile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [SidebarMobileComponent, CommonModule],
})
export class HeaderComponent {
  isSidebarVisible: boolean = false;

  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    console.log('Sidebar visibility toggled:', this.isSidebarVisible);
  }

  closeSidebar() {
    this.isSidebarVisible = false;
    console.log('Sidebar closed');
  }
}
