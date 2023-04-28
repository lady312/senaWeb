import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';

@Component({
  selector: 'app-list-resultado-aprendizaje',
  templateUrl: './list-resultado-aprendizaje.component.html',
  styleUrls: ['./list-resultado-aprendizaje.component.scss']
})
export class ListResultadoAprendizajeComponent   {

  @Input() rap: ResultadoAprendizajeModel[] = [];

  @Output() update: EventEmitter<ResultadoAprendizajeModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(Rap: ResultadoAprendizajeModel) {
    this.update.emit(Rap);
  }

  eliminar(idRap: number) {
    this.delete.emit(idRap);
  }

  agregar() {
    this.create.emit();
  }

}
