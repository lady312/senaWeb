import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FaseComponent } from './page/fase/fase.component';

const routes: Routes = [
  {
    path: '',
    component:FaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaseRoutingModule { }
