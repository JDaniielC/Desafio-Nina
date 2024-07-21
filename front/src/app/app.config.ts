import {
  ApplicationConfig, provideZoneChangeDetection, importProvidersFrom
} from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { homeInitializerProvider } from './app.initializer';
import { Facade } from './app.facade';
import { State } from './state/state';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { ComplaintsService } from './services/complaints.service';
import { InterceptorProvider } from './core/http-interceptor';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(NgxDaterangepickerMd.forRoot()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),

    State,
    Facade,
    ComplaintsService,
    InterceptorProvider,
    homeInitializerProvider,
  ],
};
