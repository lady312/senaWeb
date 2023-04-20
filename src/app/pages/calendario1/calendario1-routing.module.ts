import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Calendario1Component } from './page/calendario1/calendario1.component';


const routes: Routes = [
  {
    path: '',
    component: Calendario1Component
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Calendario1RoutingModule { }
