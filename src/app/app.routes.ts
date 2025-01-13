import { Routes } from '@angular/router';
import { GetAllUsersComponent } from './components/user-components/get-all-users/get-all-users.component';
import { CreateUserComponent } from './components/user-components/create-user/create-user.component';
import { UpdateUserComponent } from './components/user-components/update-user/update-user.component';
import { DetailUserComponent } from './components/user-components/details-user/details-user.component';
import { CreateListingComponent } from './components/listing-components/create-listing/create-listing.component';
import { GetAllListingsComponent } from './components/listing-components/get-all-listings/get-all-listings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth-service/auth.guard';
import { PredictionPageComponent } from './components/prediction-page/prediction-page.component';
import { GetAllCompaniesComponent } from './components/company-components/get-all-companies/get-all-companies.component';
import { CreateCompanyComponent } from './components/company-components/create-company/create-company.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { ListingPageComponent } from './components/listing-components/listing-page/listing-page.component';
import { CreateOfferComponent } from './components/offer-components/create-offer/create-offer.component';
import { GetAllOffersComponent } from './components/offer-components/get-all-offers/get-all-offers.component';
import { GetUserListingsComponent } from './components/listing-components/get-user-listings/get-user-listings.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' }, // Load LandingPageComponent at root
  {
    path: 'get-all-users',
    component: GetAllUsersComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'update-user/:id', component: UpdateUserComponent },
  { path: 'details-user/:id', component: DetailUserComponent },
  { path: 'create-listing', component: CreateListingComponent },
  { path: 'get-all-listings', component: CardsListComponent },
  { path: 'get-user-listings', component: GetUserListingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'price-prediction', component: PredictionPageComponent },
  { path: 'landing-page', component: LandingPageComponent },
  { path: 'card-list', component: CardsListComponent },
  { path: 'listing-page', component: ListingPageComponent },
  { path: 'create-offer', component: CreateOfferComponent },
  { path: 'listing/:id', component: ListingPageComponent },
  { path: 'all-offers/:listingId', component: GetAllOffersComponent },
  {
    path: 'create-offer/:listingId',
    component: CreateOfferComponent,
  },
  {
    path: 'get-all-companies',
    component: GetAllCompaniesComponent,
  },
  {
    path: 'create-company',
    component: CreateCompanyComponent,
  },
];
