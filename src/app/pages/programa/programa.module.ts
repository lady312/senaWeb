import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramaRoutingModule } from './programa-routing.module';
import { AddProgramaComponent } from './components/add-programa/add-programa.component';
import { ListProgramaComponent } from './components/list-programa/list-programa.component';
import { ProgramaComponent } from './page/programa/programa.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { TipoProgramaModule } from '../tipo-programa/tipo-programa.module';
import { TipoProgramaComponent } from '../tipo-programa/page/tipo-programa/tipo-programa.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddProgramaComponent,
    ListProgramaComponent,
    ProgramaComponent,

  ],
  imports: [
    CommonModule,
    ProgramaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    TipoProgramaModule,
    FormsModule
  ],
  entryComponents: [TipoProgramaComponent],

  exports:[
    AddProgramaComponent,
    ListProgramaComponent,
    ProgramaComponent
  ],
})
export class ProgramaModule { }
