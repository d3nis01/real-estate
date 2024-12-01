import { Routes } from '@angular/router';
import { GetAllUsersComponent } from './components/get-all-users/get-all-users.component';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'get-all-users', pathMatch: 'full' },
  { path: 'get-all-users', component: GetAllUsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'update-user', component: UpdateUserComponent },
  { path: '**', redirectTo: 'get-all-users' },
];
