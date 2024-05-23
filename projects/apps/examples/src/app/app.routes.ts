import { type Route } from '@angular/router';

export const APP_ROUTES = [
  {
    path: 'highlighting',
    loadChildren: () => import('@ngx-intersection/example-highlighting').then((m) => m.FEATURE_ROUTES),
  },
  {
    path: 'infinite-scroll',
    loadChildren: () => import('@ngx-intersection/example-infinite-scroll').then((m) => m.FEATURE_ROUTES),
  },
  {
    path: 'lazy-images',
    loadChildren: () => import('@ngx-intersection/example-lazy-images').then((m) => m.FEATURE_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'highlighting',
  },
] satisfies Route[];
