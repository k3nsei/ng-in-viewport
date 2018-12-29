import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
