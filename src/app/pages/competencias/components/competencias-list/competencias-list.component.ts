import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompetenciaModel } from '@models/competencia.model';

@Component({
  selector: 'app-competencias-list',
  templateUrl: './competencias-list.component.html',
  styleUrls: ['./competencias-list.component.scss']
})
export class CompetenciasListComponent {


  @Input() competencia: CompetenciaModel[] = [];

  @Output() update: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

 ////////////////////////////////////////////////////////////////////  

/////////////////////////////////////////////////////////////////////77

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(Competencia: CompetenciaModel) {
    this.update.emit(Competencia);
  }

  eliminar(idCompetencia: number) {
    this.delete.emit(idCompetencia);
  }

  agregar() {
    this.create.emit();
  }

}
