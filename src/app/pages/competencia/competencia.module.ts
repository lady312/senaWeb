import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetenciaRoutingModule } from './competencia-routing.module';
import { ListCompetenciaComponent } from './componets/list-competencia/list-competencia.component';
import { AddCompetenciaComponent } from './componets/add-competencia/add-competencia.component';
import { CompetenciaComponent } from './page/competencia/competencia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    ListCompetenciaComponent,
    AddCompetenciaComponent,
    CompetenciaComponent
  ],
  imports: [
    CommonModule,
    CompetenciaRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class CompetenciaModule { }
