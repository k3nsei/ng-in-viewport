import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvpExampleComponent } from './invp-example/invp-example.component';

const routes: Routes = [
  {
    path: '',
    component: InvpExampleComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
