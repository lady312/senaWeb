import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadAprendizajeComponent } from './page/actividad-aprendizaje/actividad-aprendizaje.component';

const routes: Routes = [
  {
    path: '',
   component: ActividadAprendizajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadAprendizajeRoutingModule { }
