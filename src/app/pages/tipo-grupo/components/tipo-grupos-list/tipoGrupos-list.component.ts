import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoGrupoModel } from '@models/tipogrupo.model';

@Component({
  selector: 'app-tipogrupos-list',
  templateUrl: './tipoGrupos-list.component.html',
  styleUrls: ['./tipoGrupos-list.component.scss']
})
export class TipogruposListComponent {

  @Input() tipoGrupos: TipoGrupoModel[] = [];

  @Output() update: EventEmitter<TipoGrupoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(tipoGrupo: TipoGrupoModel) {
    this.update.emit(tipoGrupo);
  }

  eliminar(idTipoGrupo: number) {
    this.delete.emit(idTipoGrupo);
  }

  agregar() {
    this.create.emit();
  }
}
