import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Calendario1RoutingModule } from './calendario1-routing.module';
import { ListCalendario1Component } from './components/list-calendario1/list-calendario1.component';
import { AddCalendario1Component } from './components/add-calendario1/add-calendario1.component';
import { Calendario1Component } from './page/calendario1/calendario1.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { AddCalendario2Component } from './components/add-calendario2/add-calendario2.component';
import { AddCalendario3Component } from './components/add-calendario3/add-calendario3.component';
import { AddCalendario4Component } from './components/add-calendario4/add-calendario4.component';
import { SedeModule } from '../sede/sede.module';
import { GrupoModule } from '../grupo/grupo.module';
import { ProgramaModule } from '../programa/programa.module';
import { AddProgramaComponent } from '../programa/components/add-programa/add-programa.component';
import { InfraestructuraFormComponent } from '../infraestructura/components/infraestructura-form/infraestructura-form.component';



@NgModule({
  declarations: [
    ListCalendario1Component,
    AddCalendario1Component,
    Calendario1Component,
    AddCalendario2Component,
    AddCalendario3Component,
    AddCalendario4Component,
    AddProgramaComponent,
    InfraestructuraFormComponent
  ],
  imports: [
    CommonModule,
    Calendario1RoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SedeModule,
    GrupoModule,
    
    
  ]
})
export class Calendario1Module { }
