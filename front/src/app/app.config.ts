import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { homeInitializerProvider } from './app.initializer';
import { Facade } from './app.facade';
import { State } from './state/state';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ComplaintsService } from './services/complaints.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    Facade,
    State,
    ComplaintsService,
    homeInitializerProvider
  ],
};
