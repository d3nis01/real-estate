import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMobileComponent } from '../sidebar-mobile/sidebar-mobile.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [SidebarMobileComponent, CommonModule],
})
export class HeaderComponent implements OnInit {
  isSidebarVisible: boolean = false;
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((user) => {
      this.isLoggedIn = !!user;

      if (user?.userId) {
        this.fetchUsername(user.userId);
      } else {
        this.username = null;
      }
    });
  }

  private fetchUsername(userId: string): void {
    this.userService.getUserById(userId).subscribe({
      next: (userData) => {
        this.username = userData.username;
      },
      error: (err) => {
        console.error('Failed to fetch username:', err);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  closeSidebar() {
    this.isSidebarVisible = false;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.isLoggedIn = false;
        this.username = null;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Failed to log out:', err);
      },
    });
  }
}
