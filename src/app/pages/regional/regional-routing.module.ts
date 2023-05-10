import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionalComponent } from './page/regional/regional.component';

const routes: Routes = [
  {
    path: '',
    component: RegionalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionalRoutingModule { }
