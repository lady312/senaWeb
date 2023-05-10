import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { CentroFormacionModel } from '@models/centro-formacion.model';

@Component({
  selector: 'app-list-centro-formacion',
  templateUrl: './list-centro-formacion.component.html',
  styleUrls: ['./list-centro-formacion.component.scss']
})
export class ListCentroFormacionComponent {
  @Input() centroFormaciones: CentroFormacionModel[] = [];

  @Output() update: EventEmitter<CentroFormacionModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(ap: CentroFormacionModel) {
    this.update.emit(ap);
  }

  eliminar(idAp: number) {
    this.delete.emit(idAp);
  }

  agregar() {
    this.create.emit();
  }
}
