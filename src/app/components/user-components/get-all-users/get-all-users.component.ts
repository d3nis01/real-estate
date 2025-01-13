import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user-service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css'],
})
export class GetAllUsersComponent implements OnInit {
  users: IUser[] = [];
  totalCount = 0;
  pageSize = 10;
  pageNumber = 1; 

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
      .getAllUsers(this.pageNumber, this.pageSize)
      .subscribe((response) => {
        this.users = response.items;
        this.totalCount = response.totalCount;
      });
  }

  nextPage(): void {
    if (this.pageNumber * this.pageSize < this.totalCount) {
      this.pageNumber++;
      this.loadUsers();
    }
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadUsers();
    }
  }

  goToCreateUser(): void {
    this.router.navigate(['/create-user']);
  }

  goToDetailsUser(userId: string): void {
    this.router.navigate(['/details-user', userId]);
  }
  goToCreateListing(): void {
    this.router.navigate(['/create-listing']);
  }
  goToGetAllCompanies(): void {
    this.router.navigate(['/get-all-companies']);
  }
}
