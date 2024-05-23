import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

import { APP_CONFIG as APP_CONFIG_BROWSER } from './app.config';

const APP_CONFIG_SERVER = {
  providers: [provideServerRendering()],
} satisfies ApplicationConfig;

export const APP_CONFIG: ApplicationConfig = mergeApplicationConfig(APP_CONFIG_BROWSER, APP_CONFIG_SERVER);
