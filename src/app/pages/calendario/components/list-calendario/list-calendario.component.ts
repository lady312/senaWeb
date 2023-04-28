import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarioModel } from '@models/calendario.model';


@Component({
  selector: 'app-list-calendario',
  templateUrl: './list-calendario.component.html',
  styleUrls: ['./list-calendario.component.scss']
})
export class ListCalendarioComponent {


  @Input() calendarios: CalendarioModel[] = [];

  @Output() update: EventEmitter<CalendarioModel> = new EventEmitter();
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

  actualizar(Calendario: CalendarioModel) {
    this.update.emit(Calendario);
  }

  eliminar(idCalendario: number) {
    this.delete.emit(idCalendario);
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
