import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadProyectoRoutingModule } from './actividad-proyecto-routing.module';
import { ListActividadProyectoComponent } from './components/list-actividad-proyecto/list-actividad-proyecto.component';
import { AddActividadProyectoComponent } from './components/add-actividad-proyecto/add-actividad-proyecto.component';
import { ActividadProyectoComponent } from './page/actividad-proyecto/actividad-proyecto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  exports:[
    ListActividadProyectoComponent,
    AddActividadProyectoComponent,
    AddActividadProyectoComponent
  ],
  declarations: [
    ListActividadProyectoComponent,
    AddActividadProyectoComponent,
    ActividadProyectoComponent
  ],

  imports: [
    CommonModule,
    ActividadProyectoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forChild(),
    ComunModule,
  ]
})
export class ActividadProyectoModule { }
