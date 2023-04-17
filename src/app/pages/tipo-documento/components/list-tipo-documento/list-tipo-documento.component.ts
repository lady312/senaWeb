import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoDocumentoModel } from '@models/tipo-documento.model';


@Component({
  selector: 'app-list-tipo-documento',
  templateUrl: './list-tipo-documento.component.html',
  styleUrls: ['./list-tipo-documento.component.scss']
})
export class ListTipoDocumentoComponent  {
  query: string;
  documentoFiltrados: any[] = [];
  @Input() tipoDocumentos: TipoDocumentoModel[] = [];

  @Output() update: EventEmitter<TipoDocumentoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;
  constructor() {


  }

  filter() {
    if (this.query && this.query.trim() !== '') {
      this.documentoFiltrados = this.tipoDocumentos.filter((proceso) =>
        proceso.tituloDocumento.toLowerCase().includes(this.query.toLowerCase()) ||
        proceso.descripcion.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.documentoFiltrados = this.tipoDocumentos.slice(); // Se copian todos los elementos del arreglo "procesos"
    }
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(tipoDocumento: TipoDocumentoModel) {
    this.update.emit(tipoDocumento);
  }

  eliminar(idTipoDoc: number) {
    this.delete.emit(idTipoDoc);
  }

  agregar() {
    this.create.emit();
  }

}
