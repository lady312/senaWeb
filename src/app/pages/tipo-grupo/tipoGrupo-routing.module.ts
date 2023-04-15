import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipogrupoComponent } from './page/tipo-grupo/tipoGrupo.component';
const routes: Routes = [
  {
    path: '',
    component: TipogrupoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipogrupoRoutingModule { }
