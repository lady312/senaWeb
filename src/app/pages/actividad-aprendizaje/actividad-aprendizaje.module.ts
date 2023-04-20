
import { ActividadAprendizajeRoutingModule } from './actividad-aprendizaje-routing.module';
import { AddActividadAprendizajeComponent } from './components/add-actividad-aprendizaje/add-actividad-aprendizaje.component';
import { ListActividadAprendizajeComponent } from './components/list-actividad-aprendizaje/list-actividad-aprendizaje.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActividadAprendizajeComponent } from './page/actividad-aprendizaje/actividad-aprendizaje.component';

@NgModule({
  declarations: [
    AddActividadAprendizajeComponent,
    ListActividadAprendizajeComponent,
    ActividadAprendizajeComponent
  ],
  imports: [
    CommonModule,
    ActividadAprendizajeRoutingModule,    
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()

  ]
})
export class ActividadAprendizajeModule { }
