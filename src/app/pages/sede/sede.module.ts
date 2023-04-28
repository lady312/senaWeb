import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SedeRoutingModule } from './sede-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SedeComponent } from './page/sede/sede.component';
import { SedeListComponent } from './components/sede-list/sede-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SedeFormComponent } from './components/sede-form/sede-form.component';
import { SedeResultComponent } from './components/sede-result/sede-result.component';

@NgModule({
  exports:[
    SedeComponent,
    SedeFormComponent
  ],
  declarations: [
    SedeComponent,
    SedeListComponent,
    SedeFormComponent,
    SedeResultComponent
  ],
  imports: [
    CommonModule,
    SedeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class SedeModule { }
