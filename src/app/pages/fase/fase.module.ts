import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaseRoutingModule } from './fase-routing.module';
import { ListFaseComponent } from './components/list-fase/list-fase.component';
import { AddFaseComponent } from './components/add-fase/add-fase.component';
import { FaseComponent } from './page/fase/fase.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SelectsModule } from '@components/selects/selects.module';


@NgModule({
  declarations: [
    ListFaseComponent,
    AddFaseComponent,
    FaseComponent
  ],
  imports: [
    CommonModule,
    FaseRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    SelectsModule
  ]
})
export class FaseModule { }
