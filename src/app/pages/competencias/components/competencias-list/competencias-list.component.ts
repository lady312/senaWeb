import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompetenciaModel } from '@models/Competencia.model';

@Component({
  selector: 'app-competencias-list',
  templateUrl: './competencias-list.component.html',
  styleUrls: ['./competencias-list.component.scss']
})
export class CompetenciasListComponent {

  @Input() roles: CompetenciaModel[] = [];

  @Output() update: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(rol: CompetenciaModel) {
    this.update.emit(rol);
  }

  eliminar(idRol: number) {
    this.delete.emit(idRol);
  }

  agregar() {
    this.create.emit();
  }

}
