import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfraestructuraComponent } from './page/infraestructura/infraestructura.component';

const routes: Routes = [
  {
    path:'',
    component: InfraestructuraComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfraestructuraRoutingModule { }
