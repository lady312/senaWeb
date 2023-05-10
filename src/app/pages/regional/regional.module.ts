import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionalRoutingModule } from './regional-routing.module';
import { ListRegionalComponent } from './components/list-regional/list-regional.component';
import { AddRegionalComponent } from './components/add-regional/add-regional.component';
import { RegionalComponent } from './page/regional/regional.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    ListRegionalComponent,
    AddRegionalComponent,
    RegionalComponent
  ],
  imports: [
    CommonModule,
    RegionalRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ],
  exports: [
    AddRegionalComponent,
    ListRegionalComponent,
    RegionalComponent
  ],
})
export class RegionalModule { }
