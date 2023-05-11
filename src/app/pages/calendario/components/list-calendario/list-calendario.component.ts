import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarioModel } from '@models/calendario.model';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { SedeModel } from '@models/sede.model';


@Component({
  selector: 'app-list-calendario',
  templateUrl: './list-calendario.component.html',
  styleUrls: ['./list-calendario.component.scss']
})
export class ListCalendarioComponent {


  @Input() calendarios: CalendarioModel[] = [];
  @Input() gruposList:GrupoModel[] = [];
  @Input() infraestructuras:InfraestructuraModel[]=[];
  @Input() sedes: SedeModel[]=[];

  @Output() update: EventEmitter<CalendarioModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() create1: EventEmitter<void> = new EventEmitter();
  @Output() create2: EventEmitter<void> = new EventEmitter();
  @Output() create3: EventEmitter<void> = new EventEmitter();
  @Output() crearJornada: EventEmitter<void> = new EventEmitter();
  @Output() idGrupo: EventEmitter<number> = new EventEmitter();
  @Output() idJornada: EventEmitter<number> = new EventEmitter();
  @Output() idInfraestructura: EventEmitter<number> = new EventEmitter();
  @Output() idSede: EventEmitter<number> = new EventEmitter();

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
  jornadas(){
    this.crearJornada.emit();
  }

  enviarIdGrupo(event:any){
    const idGrupo:number = event.target.value;
    this.idGrupo.emit(idGrupo);
  }
  enviarIdInfra(event:any){
    const idInfra:number = event.target.value;
    this.idInfraestructura.emit(idInfra);
  }
  enviarIdSede(event:any){
    const idSede:number = event.target.value;
    this.idSede.emit(idSede);
  }

}
