import { CompetenciasRoutingModule } from './competencias-routing.module';
import { CompetenciasComponent } from './components/competencias/competencias.component';
import { CompetenciasListComponent } from './components/competencias-list/competencias-list.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { CompetenciaComponent } from './page/competencia/competencia.component';





@NgModule({
  exports:[
    CompetenciasComponent,
    CompetenciasListComponent,
    CompetenciaComponent
  ],   
  declarations: [
    CompetenciasComponent,
    CompetenciasListComponent,
    CompetenciaComponent
  ],
  imports: [
    CommonModule,
    CompetenciasRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class CompetenciasModule { }
