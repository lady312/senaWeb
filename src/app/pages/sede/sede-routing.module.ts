import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SedeComponent } from './page/sede/sede.component';

const routes: Routes = [
  {
    path:'',
    component:SedeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SedeRoutingModule { }
