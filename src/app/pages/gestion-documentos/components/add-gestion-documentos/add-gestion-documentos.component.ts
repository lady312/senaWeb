import { Component,Output,EventEmitter } from '@angular/core';

import { GestiondocumentoService } from '@services/gestiondocumento.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-add-gestion-documentos',
  templateUrl: './add-gestion-documentos.component.html',
  styleUrls: ['./add-gestion-documentos.component.scss']
})
export class AddGestionDocumentosComponent{
  @Output() documentoSubido: EventEmitter<any> = new EventEmitter<any>();
  archivoSeleccionado: File | undefined;

  constructor(private gestiondocumentoService: GestiondocumentoService) { }

  seleccionarArchivo(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  
}
