import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoDocumentoComponent } from './page/tipo-documento/tipo-documento.component';
import { CommonModule } from '@angular/common';
import { AddProcesoComponent } from '../proceso/components/add-proceso/add-proceso.component';


const routes: Routes = [
  {
    path: '',
    component: TipoDocumentoComponent, pathMatch: 'full',
  },

  {
    path: 'procesos',
   component:  AddProcesoComponent, pathMatch: 'full',
},
{
  path: 'nuevoProceso',
  loadChildren: () =>
    import('../proceso/proceso.module').then((m) => m.ProcesoModule),
},

];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class TipoDocumentoRoutingModule { }
