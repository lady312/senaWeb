import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompetenciaModel } from '@models/competencia';


@Component({
  selector: 'app-list-competencia',
  templateUrl: './list-competencia.component.html',
  styleUrls: ['./list-competencia.component.scss']
})
export class ListCompetenciaComponent {

  @Input() competencia: CompetenciaModel[] = [];

  @Output() update: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 10;
  pageActual = 0;

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(competencia: CompetenciaModel) {
    this.update.emit(competencia);
  }

  eliminar(idCompetencia: number) {
    this.delete.emit(idCompetencia);
  }

  agregar() {
    this.create.emit();
  }

}

