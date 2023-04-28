import { Component, EventEmitter, Input, Output} from '@angular/core';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { SedeModel } from '@models/sede.model';

@Component({
  selector: 'app-sede-list',
  templateUrl: './sede-list.component.html',
  styleUrls: ['./sede-list.component.scss']
})
export class SedeListComponent{

   @Input() sedes:SedeModel[];
   @Input() ciudades:CiudadModel[];
   @Input() departamentos:DepartamentoModel[];

   @Output() delete = new EventEmitter<number>();
   @Output() create = new EventEmitter<void>();
   @Output() update = new EventEmitter<SedeModel>();
   @Output() info = new EventEmitter<SedeModel>();
   @Output() depId = new EventEmitter<number>();
   @Output() ciudadId = new EventEmitter<number>();
   @Output() busqueda = new EventEmitter<SedeModel>();
   @Output() cancel = new EventEmitter<void>();

  departamento:DepartamentoModel;

  numReg:number=10;
  pageActual:number=0;

  constructor(){
    this.ciudades=[];
  }
  enviarNumeroRegistros(event:any){
    this.numReg = event.target.value;
  }
  actualizar(sede:SedeModel){
    this.update.emit(sede);
  }
  eliminar(id:number){
    this.delete.emit(id);
  }
  agregar(){
    this.create.emit();
  }
  verInfo(sede:SedeModel){
    this.info.emit(sede);
  }
  enviarIdDep(event:any){
      let idDep:number;
      if(isNaN(event)){
        idDep = event.target.value
      }else{
        idDep = event;
      }
      this.depId.emit(idDep);
  }
  enviaridCiudad(event:any){
    let idCiudad:number;
    if(isNaN(event)){
      idCiudad = event.target.value
    }else{
      idCiudad = event
    }
    this.ciudadId.emit(idCiudad);
  }

  //revisar
  buscarSede(event:string){
    let sede:SedeModel;
    let ciudad:CiudadModel;
    let departamento:DepartamentoModel;
    sede = this.sedes.find(sede=>
      sede.nombreSede.toUpperCase()===event.toUpperCase());
    if(sede){
      this.busqueda.emit(sede);
      return;
    }
    ciudad = this.ciudades.find(ciudad=>
      ciudad.descripcion.toUpperCase()===event.toLocaleUpperCase());
    if(ciudad){
      this.ciudadId.emit(ciudad.id);
      return;
    }
    departamento = this.departamentos.find(departamento=>
      departamento.descripcion.toUpperCase()===event.toUpperCase());
    if(departamento){
      this.depId.emit(departamento.id);
      return;
    }
    this.cancel.emit();
  }

  cancelarBusqueda(){
    this.cancel.emit();
  }

}
