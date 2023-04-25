import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoDocumentoRoutingModule } from './tipo-documento-routing.module';
import { TipoDocumentoComponent } from './page/tipo-documento/tipo-documento.component';
import { AddTipoDocumentoComponent } from './components/add-tipo-documento/add-tipo-documento.component';
import { ListTipoDocumentoComponent } from './components/list-tipo-documento/list-tipo-documento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProcesoModule } from '../proceso/proceso.module';
import { ProcesoComponent } from '../proceso/page/proceso/proceso.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TipoDocumentoComponent,
    AddTipoDocumentoComponent,
    ListTipoDocumentoComponent


  ],
  imports: [
    CommonModule,
    TipoDocumentoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    HttpClientModule ,
    NgIf,
    ProcesoModule,
    FormsModule,
    SweetAlert2Module.forChild()
  ],
  entryComponents: [ProcesoComponent],
  exports: [
    TipoDocumentoComponent
  ]

})
export class TipoDocumentoModule {

 }
