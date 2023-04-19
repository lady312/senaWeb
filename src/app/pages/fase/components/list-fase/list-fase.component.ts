import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaseModel } from '@models/fase.model';

@Component({
  selector: 'app-list-fase',
  templateUrl: './list-fase.component.html',
  styleUrls: ['./list-fase.component.scss']
})
export class ListFaseComponent {

  @Input() fases: FaseModel[] = [];

  @Output() update: EventEmitter<FaseModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(fase: FaseModel) {
    this.update.emit(fase);
  }

  eliminar(idFase: number) {
    this.delete.emit(idFase);
  }

  agregar() {
    this.create.emit();
  }
}
