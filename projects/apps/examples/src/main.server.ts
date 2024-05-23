import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { APP_CONFIG } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, APP_CONFIG);

export default bootstrap;
