import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoComponent } from './page/resultado/resultado.component';

const routes: Routes = [
  {
    path: '',
    component: ResultadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoRoutingModule { }
