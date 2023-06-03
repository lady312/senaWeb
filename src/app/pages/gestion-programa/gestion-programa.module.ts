import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionProgramaRoutingModule } from './gestion-programa-routing.module';
import { GestionProgramaComponent } from './page/gestion-programa/gestion-programa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule} from '@angular/forms';
import { CompetenciaComponent } from '../competencias/page/competencia/competencia.component';
import { CompetenciasModule } from '../competencias/competencias.module';
import { ActividadProyectoModule } from '../actividad-proyecto/actividad-proyecto.module';
import { ProgramaModule } from '../programa/programa.module';
import { ProgramaComponent } from '../programa/page/programa/programa.component';
import { ActividadProyectoComponent } from '../actividad-proyecto/page/actividad-proyecto/actividad-proyecto.component';


@NgModule({
  declarations: [
    GestionProgramaComponent
  ],
  imports: [
    CommonModule,
    GestionProgramaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    FormsModule,
    CompetenciasModule,
    ActividadProyectoModule,
    ProgramaModule
  ],

  entryComponents:[
    CompetenciaComponent,
    ProgramaComponent,
    ActividadProyectoComponent
  ],
  
})
export class GestionProgramaModule { }
