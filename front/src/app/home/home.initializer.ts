import { APP_INITIALIZER, Provider } from '@angular/core';
import { HomeFacade } from './home.facade';
/*
APP_INITIALIZER:

The provided functions are injected at application startup and executed during app initialization. If any of these functions returns a Promise or an Observable, initialization does not complete until the Promise is resolved or the Observable is completed.

See more: https://angular.dev/api/core/APP_INITIALIZER?tab=description
*/

export const homeInitializer = () => (
  facade: HomeFacade
) => {}

export const homeInitializerProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: homeInitializer,
  multi: true,
  deps: [HomeFacade],
}
