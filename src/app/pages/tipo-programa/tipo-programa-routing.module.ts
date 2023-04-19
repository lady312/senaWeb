import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoProgramaComponent } from './page/tipo-programa/tipo-programa.component';

const routes: Routes = [
  {
    path: '',
    component:TipoProgramaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProgramaRoutingModule { }
