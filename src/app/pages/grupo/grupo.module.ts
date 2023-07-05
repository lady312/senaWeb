import { CommonModule, DatePipe } from '@angular/common';
import { GrupoRoutingModule } from './grupo-routing.module';
import { GruposListComponent } from './components/grupos-list/gruposList.component';
import { GrupoComponent } from './pages/grupo/grupo.component';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposService } from '@services/grupo.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TipogrupoModule } from '../tipo-grupo/tipoGrupo.module';
import { InfraestructuraModule } from '../infraestructura/infraestructura.module';
import { GrupoFormComponent } from './components/grupo-form/grupo-form.component';
import { GrupoInfraComponent } from './components/grupo-infra/grupo-infra.component';
import { GrupoInfraFormComponent } from './components/grupo-infra-form/grupo-infra-form.component';
// import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  exports: [
    GrupoFormComponent,
    GruposListComponent,
    GrupoComponent,


  ],
  declarations: [
    GruposListComponent,
    GrupoComponent,
    GrupoFormComponent,
    GrupoInfraComponent,
    GrupoInfraFormComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    GrupoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TipogrupoModule,
    InfraestructuraModule,
    // NgSelectModule
  ],
  providers: [GruposService,DatePipe],
})
export class GrupoModule { }
