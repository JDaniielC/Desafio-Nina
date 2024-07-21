import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HTTP_INTERCEPTORS,
	HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { Facade } from '../app.facade';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {
	constructor(
    private readonly facade: Facade
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.facade.setLoading(true);
    return next.handle(req).pipe(
      delay(50),
      map<HttpEvent<any> | unknown, any>(event => {
        if (event instanceof HttpResponse) {
          this.facade.setLoading(false);
        }
        return event;
      }),
    );
	}
}

export const InterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: HttpInterceptorProvider,
	multi: true,
};

