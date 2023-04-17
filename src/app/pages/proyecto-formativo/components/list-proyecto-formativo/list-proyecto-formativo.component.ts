import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';

@Component({
  selector: 'app-list-proyecto-formativo',
  templateUrl: './list-proyecto-formativo.component.html',
  styleUrls: ['./list-proyecto-formativo.component.scss']
})
export class ListProyectoFormativoComponent {

  @Input() proyectos: ProyectoFormativoModel[] = [];

  @Output() update: EventEmitter<ProyectoFormativoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(proyecto: ProyectoFormativoModel) {
    this.update.emit(proyecto);
  }

  eliminar(idProyecto: number) {
    this.delete.emit(idProyecto);
  }

  agregar() {
    this.create.emit();
  }
}
