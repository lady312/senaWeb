import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AreaModel } from '@models/area.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { SedeModel } from '@models/sede.model';
import { CiudadModel } from '@models/ciudad.model';

@Component({
  selector: 'app-infraestructura-list',
  templateUrl: './infraestructura-list.component.html',
  styleUrls: ['./infraestructura-list.component.scss']
})
export class InfraestructuraListComponent {

  @Input() infraestructuras:InfraestructuraModel[];
  @Input() sedes: SedeModel[];
  @Input() areas: AreaModel[];
  @Input() ciudades: CiudadModel[];

  @Output() update = new EventEmitter<InfraestructuraModel>();
  @Output() delete = new EventEmitter<number>();
  @Output() create = new EventEmitter<void>();
  @Output() info = new EventEmitter<InfraestructuraModel>();
  @Output() ciudadId = new EventEmitter<number>();
  @Output() filtro = new EventEmitter<{idSede:number,idArea:number}>();
  @Output() busqueda = new EventEmitter<InfraestructuraModel>();
  @Output() cancel = new EventEmitter<void>();

  ciudad:CiudadModel;

  areaId:number=0;
  sedeId:number=0;

  numReg:number=10;
  pageActual:number=0;

  constructor(){
    this.sedes=[];
  }

  enviarNumeroRegistros(event:any){
    const num = event.target.value
    this.numReg = num;
  }

  actualizar(infr:InfraestructuraModel){
    this.update.emit(infr);
  }
  eliminar(id:number){
    this.delete.emit(id);
  }
  agregar(){
    this.create.emit();
  }
  verInfo(infr:InfraestructuraModel){
    this.info.emit(infr);
  }
  enviarIdCiudad(event:any){
    let idCiudad:number;
    if (isNaN(event)) {
      idCiudad = event.target.value;
    }else{
      idCiudad = event;
    }
    this.ciudadId.emit(idCiudad);
  }
  filtrarBySede(event:any){
    let idSede:number;
    if (isNaN(event)) {
      idSede = event.target.value;
    }else{
      idSede = event;
    }
    this.sedeId=idSede;
    this.filtro.emit({idSede:this.sedeId,idArea:this.areaId});
  }
  filtrarByArea(event:any){
    let idArea:number;
    if (isNaN(event)) {
      idArea = event.target.value;
    }else{
      idArea = event;
    }
    this.areaId=idArea;
    this.filtro.emit({idSede:this.sedeId,idArea:this.areaId});
  }
  //revisar
  buscarInfraestructura(event:string){
    let infraestructura:InfraestructuraModel;
    let sede:SedeModel;
    let area:AreaModel;
    let ciudad:CiudadModel;
    infraestructura = this.infraestructuras.find(infr=>
      infr.nombreInfraestructura.toUpperCase()===event.toUpperCase());
    if(infraestructura){
      this.busqueda.emit(infraestructura);
      return;
    }
    sede = this.sedes.find(sede=>
      sede.nombreSede.toUpperCase()===event.toUpperCase());
    if(sede){
      this.filtrarBySede(sede.id);
      return;
    }
    area = this.areas.find(area=>
      area.nombreArea.toUpperCase()===event.toUpperCase());
    if(area){
      this.filtrarByArea(area.id);
      return;
    }
    ciudad = this.ciudades.find(ciudad=>
      ciudad.descripcion.toUpperCase()===event.toUpperCase());
    if(ciudad){
      this.enviarIdCiudad(ciudad.id);
      return;
    }
    this.cancel.emit();
  }

  cancelarBusqueda(){
    this.cancel.emit();
  }
}
