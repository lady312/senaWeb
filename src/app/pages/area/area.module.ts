import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { AreaComponent } from './page/area/area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { AreaListComponent } from './components/area-list/area-list.component';
import { AreaFormComponent } from './components/area-form/area-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AreaResultComponent } from './components/area-result/area-result.component';

@NgModule({
  exports:[
    AreaComponent
  ],
  declarations: [
    AreaComponent,
    AreaListComponent,
    AreaFormComponent,
    AreaResultComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module.forChild()
  ]
})
export class AreaModule { }
