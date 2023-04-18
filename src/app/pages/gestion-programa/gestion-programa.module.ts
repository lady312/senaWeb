import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionProgramaRoutingModule } from './gestion-programa-routing.module';
import { GestionProgramaComponent } from './page/gestion-programa/gestion-programa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    GestionProgramaComponent
  ],
  imports: [
    CommonModule,
    GestionProgramaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    FormsModule
  ]
})
export class GestionProgramaModule { }
