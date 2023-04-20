import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { SelectsComponent } from './selects.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    // ... tus componentes, directivas y pipes
    SelectsComponent,

  ],
  imports: [
    // ... otros módulos
    CommonModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports: [
    // Exporta el componente para que pueda ser utilizado en otros módulos
    SelectsComponent,

  ]
})
export class SelectsModule { }

