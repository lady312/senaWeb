import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatriculasRoutingModule } from './matriculas-routing.module';
import { MatriculaComponent } from './page/matricula/matricula.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
// import { StepsModule } from 'primeng/steps';
import { ComunModule } from '@components/comun.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UsuarioModule } from "../usuario/usuario.module";
import { MatIconModule } from '@angular/material/icon';


////// gestion docuemntal 




import { ListGestionDocumentosComponent } from './list-gestion-documentos/list-gestion-documentos.component'; 

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxExtendedPdfViewerModule ,pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


import { MyDatePickerModule } from 'mydatepicker';




@NgModule({
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        MatriculaComponent,
        MatIconModule,
      
    ],
    declarations: [
        MatriculaComponent,
        ListGestionDocumentosComponent
    ],
    imports: [
        // TipogrupoModule,
        CommonModule,
        ComunModule,
        MatriculasRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        // StepsModule,
        FormsModule,
        UsuarioModule,
        NgxExtendedPdfViewerModule ,
        NgxPaginationModule,
        ModalModule,
        NgbPaginationModule,
        MyDatePickerModule
    
    ],
    providers: [
        // Otros proveedores
        {
          provide: pdfDefaultOptions,
          useValue: {
            textLayer: true,
            showHandToolButton: true
            // Otras opciones predeterminadas que desees configurar
          }
        }
      ],
})
export class MatriculasModule { }
