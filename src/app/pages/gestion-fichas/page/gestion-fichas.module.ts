import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFichasRoutingModule } from './gestion-fichas-routing.module';
import { GestionFichasComponent } from './gestion-fichas/gestion-fichas.component';
import { GruposListComponent } from '../../grupo/components/grupos-list/gruposList.component';
import { GrupoComponent } from '../../grupo/pages/grupo/grupo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  exports:[
    GestionFichasComponent,
  ],
  declarations: [
    GestionFichasComponent,
  ],
  imports: [
    CommonModule,
    GestionFichasRoutingModule,
    ReactiveFormsModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  entryComponents:[
    GruposListComponent,
    GrupoComponent,
  ],
})
export class GestionFichasModule { }
