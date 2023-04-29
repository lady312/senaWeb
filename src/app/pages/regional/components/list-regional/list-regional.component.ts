import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegionalModel } from '@models/RegionalModel';

@Component({
  selector: 'app-list-regional',
  templateUrl: './list-regional.component.html',
  styleUrls: ['./list-regional.component.scss']
})
export class ListRegionalComponent {

  @Input() regionales: RegionalModel[] = [];

  @Output() update: EventEmitter<RegionalModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 10;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(regional: RegionalModel) {
    this.update.emit(regional);
  }

  eliminar(idRegional: number) {
    this.delete.emit(idRegional);
  }

  agregar() {
    this.create.emit();
  }

}
