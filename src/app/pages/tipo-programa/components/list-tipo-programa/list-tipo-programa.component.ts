import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TipoProgramaModel } from '@models/tipo-programa.model';

@Component({
  selector: 'app-list-tipo-programa',
  templateUrl: './list-tipo-programa.component.html',
  styleUrls: ['./list-tipo-programa.component.scss']
})
export class ListTipoProgramaComponent {

  @Input() tipoPs: TipoProgramaModel[] = [];

  @Output() update: EventEmitter<TipoProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(tipoP: TipoProgramaModel) {
    this.update.emit(tipoP);
  }

  eliminar(idtipoP: number) {
    this.delete.emit(idtipoP);
  }

  agregar() {
    this.create.emit();
  }
}
