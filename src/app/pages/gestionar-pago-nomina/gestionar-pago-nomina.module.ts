import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionarPagoNominaRoutingModule } from './gestionar-pago-nomina-routing.module';
import { ListarPagosNominaComponent } from './components/listar-pagos-nomina/listar-pagos-nomina.component';


@NgModule({
  declarations: [
    ListarPagosNominaComponent
  ],
  imports: [
    CommonModule,
    GestionarPagoNominaRoutingModule
  ]
})
export class GestionarPagoNominaModule { }
