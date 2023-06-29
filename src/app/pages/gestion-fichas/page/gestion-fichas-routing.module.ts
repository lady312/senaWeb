import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionFichasComponent } from './gestion-fichas/gestion-fichas.component';

const routes: Routes = [

  {
    path: '',
    component: GestionFichasComponent
  }
];

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFichasRoutingModule { }
