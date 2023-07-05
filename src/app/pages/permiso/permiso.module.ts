import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermisoRoutingModule } from './permiso-routing.module';
import { PermisosComponent } from './components/permisos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    PermisosComponent
  ],
  imports: [
    CommonModule,
    PermisoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule
  ]
})
export class PermisoModule { }
