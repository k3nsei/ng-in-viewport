import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InViewportModule } from 'ng-in-viewport';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvpExampleComponent } from './invp-example/invp-example.component';

@NgModule({
  declarations: [AppComponent, InvpExampleComponent],
  imports: [BrowserModule, InViewportModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
