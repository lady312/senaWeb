import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetenciasComponent } from './components/competencias/competencias.component';
import { CompetenciasListComponent } from './components/competencias-list/competencias-list.component';
import { CompetenciaComponent } from './page/competencia/competencia.component';

const routes: Routes = [
  {
    path: '',
    component: CompetenciaComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenciasRoutingModule { }
