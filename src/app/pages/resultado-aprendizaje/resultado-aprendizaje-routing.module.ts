import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoAprendizajeComponent } from './page/resultado-aprendizaje/resultado-aprendizaje.component';

const routes: Routes = [
  {
    path: '',
    component: ResultadoAprendizajeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoAprendizajeRoutingModule { }
