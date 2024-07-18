import { APP_INITIALIZER, Provider } from '@angular/core';
import { Facade } from './app.facade';
import { State } from './state/state';
import { ComplaintsService } from './services/complaints.service';
/*
APP_INITIALIZER:

The provided functions are injected at application startup and executed during app initialization. If any of these functions returns a Promise or an Observable, initialization does not complete until the Promise is resolved or the Observable is completed.

See more: https://angular.dev/api/core/APP_INITIALIZER?tab=description
*/

export const homeInitializer = (facade: Facade) =>
() => {
  facade.fetchAllComplaints();
}

export const homeInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: homeInitializer,
  multi: true,
  deps: [Facade, State, ComplaintsService],
}
