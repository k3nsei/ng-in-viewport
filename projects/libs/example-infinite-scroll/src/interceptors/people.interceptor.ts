import { type HttpEvent, type HttpHandlerFn, type HttpRequest, HttpResponse } from '@angular/common/http';

import { type Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Simulate call to HTTP API endpoint
 */
export const PeopleInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const url = new URL(req.url, globalThis.location.origin);

  if (url.pathname === '/api/v1/people') {
    return of(
      new HttpResponse<{ name: string }[]>({
        url: req.url,
        status: 200,
        statusText: 'OK',
        body: [
          { name: 'Jake Williams' },
          { name: 'Anusha Shroff' },
          { name: 'Alex Lopez' },
          { name: 'Bertha Parker' },
          { name: 'Emma Chen' },
          { name: 'Dwayne Simmmons' },
          { name: 'Nick Van Ginneken' },
          { name: 'Nelli Pesola' },
          { name: 'Rafael Miller' },
          { name: 'Jonathan Hunt' },
        ],
      }),
    ).pipe(delay(500));
  }

  return next(req);
};
