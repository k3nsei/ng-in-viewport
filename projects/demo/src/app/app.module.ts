import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InViewportModule } from 'ng-in-viewport';

import { AppComponent } from './app.component';
import { ExampleComponent } from './example/example.component';

@NgModule({
  imports: [BrowserModule, InViewportModule],
  declarations: [AppComponent, ExampleComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
