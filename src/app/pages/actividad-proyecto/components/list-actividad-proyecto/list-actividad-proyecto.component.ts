import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActividadProyectoModel } from '@models/actividad-proyecto.model';

@Component({
  selector: 'app-list-actividad-proyecto',
  templateUrl: './list-actividad-proyecto.component.html',
  styleUrls: ['./list-actividad-proyecto.component.scss']
})
export class ListActividadProyectoComponent {

  @Input() actividadProyectos: ActividadProyectoModel[] = [];

  @Output() update: EventEmitter<ActividadProyectoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(ap: ActividadProyectoModel) {
    this.update.emit(ap);
  }

  eliminar(idAp: number) {
    this.delete.emit(idAp);
  }

  agregar() {
    this.create.emit();
  }
}
