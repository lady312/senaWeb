import { CommonModule } from '@angular/common';
import { GrupoRoutingModule } from './grupo-routing.module';
import { GruposComponent } from './components/grupos/grupos.component';
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

@NgModule({
  exports: [
    GruposComponent
  ],
  declarations: [
    GruposComponent,
    GruposListComponent,
    GrupoComponent,
    // TipogrupoModalComponent,
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
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    TipogrupoModule,
  ],
  providers: [GruposService],
  bootstrap: [GruposComponent]
})
export class GrupoModule { }
