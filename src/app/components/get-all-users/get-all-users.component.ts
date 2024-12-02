import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }

  editUser(userId: string): void {
    this.router.navigate(['/update-user', userId]);
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.users = this.users.filter((user) => user.id !== userId);
      },
    });
  }

  goToCreateUser(): void {
    this.router.navigate(['/create-user']);
  }
  goToUpdateUser(userId: string): void {
    this.router.navigate(['/update-user', userId]);
  }
  goToGetAllUsers(): void {
    this.router.navigate(['/get-all-users']);
  }
}
