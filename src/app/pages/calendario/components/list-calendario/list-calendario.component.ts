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

  @Input() gruposList:GrupoModel[] = [];
  @Input() infraestructuras:InfraestructuraModel[]=[];
  @Input() sedes: SedeModel[]=[];

  @Output() createSede: EventEmitter<void> = new EventEmitter();
  @Output() createGrupo: EventEmitter<void> = new EventEmitter();
  @Output() createPrograma: EventEmitter<void> = new EventEmitter();
  @Output() createInfra: EventEmitter<void> = new EventEmitter();
  @Output() crearJornada: EventEmitter<void> = new EventEmitter();
  @Output() idGrupo: EventEmitter<number> = new EventEmitter();
  @Output() idJornada: EventEmitter<number> = new EventEmitter();
  @Output() idInfraestructura: EventEmitter<number> = new EventEmitter();
  @Output() idSede: EventEmitter<number> = new EventEmitter();


  selectInfr:number = 0;
  selectSede:number = 0;
 
  sede() {
    this.createSede.emit();
  }
  programa() {
    this.createGrupo.emit();
  }
  grupos() {
    this.createPrograma.emit();
  }
  ambientes() {
    this.createInfra.emit();
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
