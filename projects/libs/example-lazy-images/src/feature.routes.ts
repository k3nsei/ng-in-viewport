import { type Route } from '@angular/router';

export const FEATURE_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./components').then((m) => m.LazyImagesComponent),
  },
] satisfies Route[];
