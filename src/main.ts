import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component'; // Adjust the path as necessary
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    [provideHttpClient()],
  ],
}).catch((err) => console.error(err));
