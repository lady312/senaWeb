import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadoAprendizajeRoutingModule } from './resultado-aprendizaje-routing.module';
import { AddResultadoAprendizajeComponent } from './components/add-resultado-aprendizaje/add-resultado-aprendizaje.component';
import { ListResultadoAprendizajeComponent } from './components/list-resultado-aprendizaje/list-resultado-aprendizaje.component';
import { ResultadoAprendizajeComponent } from './page/resultado-aprendizaje/resultado-aprendizaje.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    AddResultadoAprendizajeComponent,
    ListResultadoAprendizajeComponent,
    ResultadoAprendizajeComponent
  ],
  imports: [
    CommonModule,
    ResultadoAprendizajeRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    FormsModule
  ]
})
export class ResultadoAprendizajeModule { }
