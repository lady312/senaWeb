import { Component , OnInit, ViewChild,ElementRef} from '@angular/core';
import { GestionDocumentoModel } from '@models/gestion-documentos.model';
import { UINotificationService } from '@services/uinotification.service';
import { GestiondocumentoService } from '@services/gestiondocumento.service';
import { AsignacionEstadoDocumentoModel } from '@models/AsignacionEstadoDocumento.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-gestion-documentos',
  templateUrl: './gestion-documentos.component.html',
  styleUrls: ['./gestion-documentos.component.scss']
})
export class GestionDocumentosComponent implements OnInit{
  showModalDocumentos = false;
   showModalGetDocumentos = false;
  filesConductor: { [key: number]: { files: FileList; fechaVig: string } } = {};
  id: number;
  idDocumentos: number;
  documentos: any[] = [];
  filesRuta: FileList;
  pdfurl = '';
  documetoGestiones: AsignacionEstadoDocumentoModel[] = [];
  idProceso: GestionDocumentoModel;
  Invoiceheader: any;
 
  invoiceno: any;
 

  constructor(
    private _uiNotificationService: UINotificationService,
    private _gestionDocumentoService: GestiondocumentoService, private modalservice: NgbModal
  ) {}

  @ViewChild('content') popupview !: ElementRef;
  
  ngOnInit(): void {
 
  }

 
}
