import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentroFormacionRoutingModule } from './centro-formacion-routing.module';
import { CentroFormacionComponent } from './page/centro-formacion/centro-formacion.component';
import { ListCentroFormacionComponent } from './components/list-centro-formacion/list-centro-formacion.component';
import { AddCentroFormacionComponent } from './components/add-centro-formacion/add-centro-formacion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    CentroFormacionComponent,
    ListCentroFormacionComponent,
    AddCentroFormacionComponent
  ],
  imports: [
    CommonModule,
    CentroFormacionRoutingModule,
    SweetAlert2Module.forChild(),
    ComunModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  exports: [
    AddCentroFormacionComponent,
    ListCentroFormacionComponent,
    CentroFormacionComponent
  ],
})
export class CentroFormacionModule { }
