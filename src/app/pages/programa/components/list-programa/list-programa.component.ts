import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgramaModel } from '@models/programa.model';

@Component({
  selector: 'app-list-programa',
  templateUrl: './list-programa.component.html',
  styleUrls: ['./list-programa.component.scss']
})
export class ListProgramaComponent {

  @Input() programas: ProgramaModel[] = [];

  @Output() update: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(programa: ProgramaModel) {
    this.update.emit(programa);
  }

  eliminar(idPrograma: number) {
    this.delete.emit(idPrograma);
  }

  agregar() {
    this.create.emit();
  }
}
