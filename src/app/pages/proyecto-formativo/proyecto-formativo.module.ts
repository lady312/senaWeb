import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectoFormativoRoutingModule } from './proyecto-formativo-routing.module';
import { ListProyectoFormativoComponent } from './components/list-proyecto-formativo/list-proyecto-formativo.component';
import { AddProyectoFormativoComponent } from './components/add-proyecto-formativo/add-proyecto-formativo.component';
import { ProyectoFormativoComponent } from './page/proyecto-formativo/proyecto-formativo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    ListProyectoFormativoComponent,
    AddProyectoFormativoComponent,
    ProyectoFormativoComponent
  ],
  imports: [
    CommonModule,
    ProyectoFormativoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class ProyectoFormativoModule { }
