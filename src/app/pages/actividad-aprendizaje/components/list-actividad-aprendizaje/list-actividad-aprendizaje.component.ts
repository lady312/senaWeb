import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActividadAprendizajeModel } from '@models/actividad-aprendizaje.model';

@Component({
  selector: 'app-list-actividad-aprendizaje',
  templateUrl: './list-actividad-aprendizaje.component.html',
  styleUrls: ['./list-actividad-aprendizaje.component.scss']
})
export class ListActividadAprendizajeComponent  {

  @Input() actividadAprendizajes: ActividadAprendizajeModel[] = [];

  @Output() update: EventEmitter<ActividadAprendizajeModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(actividadAprendizaje: ActividadAprendizajeModel) {
    this.update.emit(actividadAprendizaje);
  }

  eliminar(idTipoDoc: number) {
    this.delete.emit(idTipoDoc);
  }

  agregar() {
    this.create.emit();
  }

}
