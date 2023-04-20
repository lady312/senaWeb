import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Calendario1Model } from '@models/calendario1.model';


@Component({
  selector: 'app-list-calendario1',
  templateUrl: './list-calendario1.component.html',
  styleUrls: ['./list-calendario1.component.scss']
})
export class ListCalendario1Component {


  @Input() calendarios1: Calendario1Model[] = [];

  @Output() update: EventEmitter<Calendario1Model> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() create1: EventEmitter<void> = new EventEmitter();
  @Output() create2: EventEmitter<void> = new EventEmitter();
  @Output() create3: EventEmitter<void> = new EventEmitter();


  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(calendario1: Calendario1Model) {
    this.update.emit(calendario1);
  }

  eliminar(idcalendario1: number) {
    this.delete.emit(idcalendario1);
  }

  sede() {
    this.create.emit();
  }
  programa() {
    this.create1.emit();
  }
  grupos() {
    this.create2.emit();
  }
  ambientes() {
    this.create3.emit();
  }
}
