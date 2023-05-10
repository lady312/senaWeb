import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProgramaRoutingModule } from './tipo-programa-routing.module';
import { AddTipoProgramaComponent } from './components/add-tipo-programa/add-tipo-programa.component';
import { ListTipoProgramaComponent } from './components/list-tipo-programa/list-tipo-programa.component';
import { TipoProgramaComponent } from './page/tipo-programa/tipo-programa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AddTipoProgramaComponent,
    ListTipoProgramaComponent,
    TipoProgramaComponent
  ],
  imports: [
    CommonModule,
    TipoProgramaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()

  ],

  exports:[
    AddTipoProgramaComponent,
    ListTipoProgramaComponent,
    TipoProgramaComponent
  ],

})
export class TipoProgramaModule {}
