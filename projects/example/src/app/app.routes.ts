import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    path: 'highlighting',
    pathMatch: 'full',
    loadComponent: () => import('./page-highlighting/page-highlighting.component'),
  },
  {
    path: 'infinite-scroll',
    pathMatch: 'full',
    loadComponent: () => import('./page-infinite-scroll/page-infinite-scroll.component'),
  },
  {
    path: 'lazy-images',
    pathMatch: 'full',
    loadComponent: () => import('./page-lazy-images/page-lazy-images.component'),
  },
  {
    path: '**',
    redirectTo: '/highlighting',
  },
];
