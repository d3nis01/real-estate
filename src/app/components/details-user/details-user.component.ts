import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-details-user',
  standalone: true,
  imports: [],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.css',
})
export class DetailUserComponent implements OnInit {
  user: IUser | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.userService.getUserById(userId).subscribe((user) => {
          this.user = user;
        });
      }
    });
  }

  editUser(userId: string): void {
    this.router.navigate(['/update-user', userId]);
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.router.navigate(['/get-all-users']);
      },
    });
  }

  goToAllUsers(): void {
    this.router.navigate(['/get-all-users']);
  }
}
