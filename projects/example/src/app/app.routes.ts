import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: 'highlighting',
    loadComponent: () => import('./page-highlighting/page-highlighting.component'),
  },
  {
    path: 'infinite-scroll',
    loadComponent: () => import('./page-infinite-scroll/page-infinite-scroll.component'),
  },
  {
    path: 'lazy-images',
    loadComponent: () => import('./page-lazy-images/page-lazy-images.component'),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'highlighting',
  },
];
