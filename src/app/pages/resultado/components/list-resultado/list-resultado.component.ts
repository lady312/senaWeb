import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResultadoModel } from '@models/resultado.model';

@Component({
  selector: 'app-list-resultado',
  templateUrl: './list-resultado.component.html',
  styleUrls: ['./list-resultado.component.scss']
})
export class ListResultadoComponent {
  
  @Input() resultado: ResultadoModel[] = [];

  @Output() update: EventEmitter<ResultadoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 10;
  pageActual = 0;

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(resultado: ResultadoModel) {
    this.update.emit(resultado);
  }

  eliminar(idResultado: number) {
    this.delete.emit(idResultado);
  }

  agregar() {
    this.create.emit();
  }
}
