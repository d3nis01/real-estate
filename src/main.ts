import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component'; 
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    [provideHttpClient()], provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
