import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDocumentosRoutingModule } from './gestion-documentos-routing.module';
import { AddGestionDocumentosComponent } from './components/add-gestion-documentos/add-gestion-documentos.component';
import { GestionDocumentosComponent } from './pages/gestion-documentos.component';
import { ListGestionDocumentosComponent } from './components/list-gestion-documentos/list-gestion-documentos.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxExtendedPdfViewerModule ,pdfDefaultOptions} from 'ngx-extended-pdf-viewer';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComunModule } from "../../components/comun.module";
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { GetDocumentosComponent } from './components/get-documentos/get-documentos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyDatePickerModule } from 'mydatepicker';





@NgModule({
    declarations: [
        GestionDocumentosComponent,
        AddGestionDocumentosComponent,
        ListGestionDocumentosComponent,
        GetDocumentosComponent,
       
    ],
    imports: [
        CommonModule,
        GestionDocumentosRoutingModule,
        FormsModule,
        NgxPaginationModule,
        NgxExtendedPdfViewerModule,
        ModalModule.forRoot(),
        ComunModule,
        NgbPaginationModule,
        ReactiveFormsModule,
        MyDatePickerModule
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
export class GestionDocumentosModule { }
