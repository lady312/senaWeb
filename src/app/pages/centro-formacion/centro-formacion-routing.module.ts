import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CentroFormacionComponent } from './page/centro-formacion/centro-formacion.component';

const routes: Routes = [
  {
    path: '',
    component:CentroFormacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentroFormacionRoutingModule { }
