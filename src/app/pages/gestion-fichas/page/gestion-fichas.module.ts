import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFichasRoutingModule } from './gestion-fichas-routing.module';
import { GestionFichasComponent } from './gestion-fichas/gestion-fichas.component';
import { GruposComponent } from '../../grupo/components/grupos/grupos.component';
import { GruposListComponent } from '../../grupo/components/grupos-list/gruposList.component';
import { GrupoComponent } from '../../grupo/pages/grupo/grupo.component';


@NgModule({

  declarations: [
    GestionFichasComponent,
  ],
  imports: [
    CommonModule,
    GestionFichasRoutingModule,

  ],
  entryComponents:[
    GruposComponent,
    GruposListComponent,
    GrupoComponent,
  ],
})
export class GestionFichasModule { }
