import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { JornadaModel } from '@models/jornada.model';
@Component({
  selector: 'app-list-jornada',
  templateUrl: './list-jornada.component.html',
  styleUrls: ['./list-jornada.component.scss'],
})
export class ListJornadaComponent implements OnInit {
  @Input() jornadas: JornadaModel[] = [];
  @Input() jornada: JornadaModel;

  @Output() update: EventEmitter<JornadaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 10;
  pageActual = 0;

  jorn: JornadaModel = null;
  jorna: JornadaModel[] = [];
  formJornada: UntypedFormGroup;

  constructor(
    ) {
    this.jornada = {
      id: null,
      horaFinal: '',
      horaInicial: null,
      descripcion: null,
      nombreJornada: '',
      numeroHoras: null,
    };
  }

  ngOnInit(): void {}

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(jornada: JornadaModel) {
    this.update.emit(jornada);
  }

  eliminar(idJorn: number) {
    this.delete.emit(idJorn);
  }

  agregar() {
    this.create.emit();
  }
}
