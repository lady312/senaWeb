import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadProyectoComponent } from './page/actividad-proyecto/actividad-proyecto.component';

const routes: Routes = [
  {
    path: '',
    component:ActividadProyectoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadProyectoRoutingModule { }
