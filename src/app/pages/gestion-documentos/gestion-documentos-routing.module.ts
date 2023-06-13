import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionDocumentosComponent } from './pages/gestion-documentos.component';



const routes: Routes = [

  {
    path: '',
   component : GestionDocumentosComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDocumentosRoutingModule { }
