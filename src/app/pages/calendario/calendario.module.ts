import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SedeModule } from '../sede/sede.module';
import { GrupoModule } from '../grupo/grupo.module';
import { InfraestructuraModule } from '../infraestructura/infraestructura.module';
import { ProgramaModule } from '../programa/programa.module';
import { CalendarioComponent } from './page/calendario/calendario.component';
import { ListCalendarioComponent } from './components/list-calendario/list-calendario.component';

@NgModule({
  declarations: [
    CalendarioComponent,
    ListCalendarioComponent
  ],
  imports: [
    CommonModule,
    CalendarioRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SedeModule,
    GrupoModule,
    InfraestructuraModule,
    ProgramaModule
  ]
})
export class CalendarioModule { }
