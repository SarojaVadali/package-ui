import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';

const routes: Routes = [
  {path:'package', component:PackagesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
