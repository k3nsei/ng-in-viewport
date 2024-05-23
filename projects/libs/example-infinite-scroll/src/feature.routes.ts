import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { type Route } from '@angular/router';

import { PeopleInterceptor } from './interceptors';
import { DataService } from './services/data.service';

export const FEATURE_ROUTES = [
  {
    path: '',
    providers: [provideHttpClient(withFetch(), withInterceptors([PeopleInterceptor])), DataService],
    loadComponent: () => import('./components').then((m) => m.InfiniteScrollComponent),
  },
] satisfies Route[];
