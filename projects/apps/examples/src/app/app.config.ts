import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { APP_ROUTES } from './app.routes';

export const APP_CONFIG = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideRouter(APP_ROUTES, withComponentInputBinding(), withPreloading(PreloadAllModules), withViewTransitions()),

    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
} satisfies ApplicationConfig;
