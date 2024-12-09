import { Routes } from '@angular/router';
import { GetAllUsersComponent } from './components/user-components/get-all-users/get-all-users.component';
import { CreateUserComponent } from './components/user-components/create-user/create-user.component';
import { UpdateUserComponent } from './components/user-components/update-user/update-user.component';
import { DetailUserComponent } from './components/user-components/details-user/details-user.component';
import { CreateListingComponent } from './components/listing-components/create-listing/create-listing.component';
import { GetAllListingsComponent } from './components/listing-components/get-all-listings/get-all-listings.component';

export const routes: Routes = [
  { path: '', redirectTo: '/get-all-users', pathMatch: 'full' },
  { path: 'get-all-users', component: GetAllUsersComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'details-user/:id', component: DetailUserComponent },
  { path: 'create-listing', component: CreateListingComponent },
  { path: 'get-all-listings', component: GetAllListingsComponent },
];
