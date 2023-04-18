import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectoFormativoComponent } from './page/proyecto-formativo/proyecto-formativo.component';

const routes: Routes = [
  {
    path: '',
    component:ProyectoFormativoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectoFormativoRoutingModule { }
