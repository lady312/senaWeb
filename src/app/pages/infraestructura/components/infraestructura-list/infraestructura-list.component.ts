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

  ciudad:CiudadModel;
  sedeSelect:boolean=true;
  nombreInfra:string='';

  areaId:number=0;
  sedeId:number=0;

  numReg:number=10;
  pageActual:number=0;

  constructor(){
    this.sedes=[];
  }

  enviarNumeroRegistros(num: number){
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
  enviarIdCiudad(idCiudad:number){
    if(idCiudad>0){
      this.sedeSelect=false;
    }else{
      this.sedeSelect=true;
      this.sedeId=0;
      this.filtro.emit({idSede:this.sedeId,idArea:this.areaId});
    }
    this.ciudadId.emit(idCiudad);
  }
  filtrarBySede(idSede:number){
    this.sedeId=idSede;
    this.filtro.emit({idSede:this.sedeId,idArea:this.areaId});
  }
  filtrarByArea(idArea:number){
    this.areaId=idArea;
    this.filtro.emit({idSede:this.sedeId,idArea:this.areaId});
  }
  //revisar
  buscarInfraestructura(){
    const busqueda:InfraestructuraModel = this.infraestructuras.find(infr=>
      infr.nombreInfraestructura.toUpperCase()===this.nombreInfra.toUpperCase());
      this.busqueda.emit(busqueda);
  }
}
