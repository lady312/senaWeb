import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFichasRoutingModule } from './gestion-fichas-routing.module';
import { GestionFichasComponent } from './gestion-fichas/gestion-fichas.component';


@NgModule({

  declarations: [
    GestionFichasComponent,
  ],
  imports: [
    CommonModule,
    GestionFichasRoutingModule
  ]
})
export class GestionFichasModule { }
