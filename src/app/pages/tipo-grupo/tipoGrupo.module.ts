import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipogrupoRoutingModule } from './tipoGrupo-routing.module';
import { TipogruposComponent } from './components/tipo-grupos/tipoGrupos.component';
import { TipogruposListComponent } from './components/tipo-grupos-list/tipoGrupos-list.component';
import { TipogrupoComponent } from './page/tipo-grupo/tipoGrupo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    TipogruposComponent,
    TipogruposListComponent,
    TipogrupoComponent
  ],
  exports: [
    [TipogruposComponent,
    TipogruposListComponent,
    TipogrupoComponent]
  ],
  imports: [
    CommonModule,
    TipogrupoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class TipogrupoModule { }
