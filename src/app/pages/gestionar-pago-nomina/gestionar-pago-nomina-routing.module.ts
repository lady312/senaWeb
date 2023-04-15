import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPagosNominaComponent } from './components/listar-pagos-nomina/listar-pagos-nomina.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPagosNominaComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionarPagoNominaRoutingModule { }
