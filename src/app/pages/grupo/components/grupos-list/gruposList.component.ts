import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GrupoModel } from '@models/grupo.model';


@Component({
  selector: 'app-grupos-list',
  templateUrl: './gruposList.component.html',
  styleUrls: ['./gruposList.component.scss'],
})
export class GruposListComponent {

  @Input() grupos: GrupoModel[] = [];

  @Output() create = new EventEmitter<void>();
  @Output() update = new EventEmitter<GrupoModel>();
  @Output() delete = new EventEmitter<number>();

  numReg: number = 10;
  pageActual: number = 0;

  verJornadas:boolean = false;
  verInfras:boolean = false;

  enviarNumeroRegistros(event: any) {
    const num: number = event.target.value;
    this.numReg = num;
  }

  agregar(){
    this.create.emit();
  }

  actualizar(grupo:GrupoModel){
    this.update.emit(grupo);
  }

  eliminar(idGrupo:number){
    this.delete.emit(idGrupo);
  }

}
