import { Component, OnInit } from '@angular/core';
import { AreaModel } from '@models/area.model';
import { CiudadModel } from '@models/ciudad.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { SedeModel } from '@models/sede.model';
import { AreaService } from '@services/area.service';
import { CiudadService } from '@services/ciudad.service';
import { InfraestructuraService } from '@services/infraestructura.service';
import { SedeService } from '@services/sede.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-infraestructura',
  templateUrl: './infraestructura.component.html',
  styleUrls: ['./infraestructura.component.scss']
})
export class InfraestructuraComponent implements OnInit{

  protected showFormInfr:boolean = false;
  protected formTitle:string;
  protected showInfoInfr:boolean = false;
  protected showResultadoBusqueda:boolean = false;
  protected resultadoBusqueda: InfraestructuraModel = null;

  infraestructura:InfraestructuraModel;
  infreaestructuras:InfraestructuraModel[]=[];

  ciudades:CiudadModel[]=[];
  sedes:SedeModel[]=[];
  areas:AreaModel[]=[];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _infraestructuraService: InfraestructuraService,
    private _ciudadService: CiudadService,
    private _sedeService: SedeService,
    private _areaService: AreaService
  ){}

  ngOnInit(): void {
    this.getInfraestructuras();
    this.getCiudades();
    this.getAreas();
    this.getSedes();
  }

  getInfraestructuras(){
    this._infraestructuraService.traerInfraestructuras().subscribe(infrs=>{
      this.infreaestructuras=infrs;
    },error=>{
      this._uiNotificationService.error('Error de Conexión');
    });
  }

  getCiudades(){
    this._ciudadService.traerCiudades().subscribe(ciudades=>{
      this.ciudades=ciudades;
    });
  }
  getSedes(){
    this._sedeService.traerSedes().subscribe(sedes=>{
      this.sedes=sedes;
    })
  }
  getSedesByCiudad(idCiudad:number){
    this._sedeService.sedesByCiudad(idCiudad).subscribe(sedes=>{
      this.sedes=sedes;
      this.infreaestructuras=[];
      this.sedes.forEach(sede=>{
        this._infraestructuraService.infrBySede(sede.id).subscribe(infr=>{
          this.infreaestructuras=this.infreaestructuras.concat(infr);
        });
      });
    });
  }
  getAreas(){
    this._areaService.traerAreas().subscribe(areas=>{
      this.areas=areas;
    });
  }
  filtrarInfraestructuras(SedeArea:{idSede:number,idArea:number}){
    const idSede:number=SedeArea.idSede;
    const porSede:boolean = (idSede > 0);
    const idArea:number = SedeArea.idArea;
    const porArea:boolean = ( idArea> 0);
    if(porSede && porArea){
      this._infraestructuraService.infrBySedeArea(idSede,idArea).subscribe(infrs=>{
        this.infreaestructuras=infrs;
      });
    }else if(porSede){
      this._infraestructuraService.infrBySede(idSede).subscribe(infrs=>{
        this.infreaestructuras=infrs;
      });
    }else if(porArea){
      if(this.sedes){
        this._infraestructuraService.infrByArea(idArea).subscribe(infrs=>{
          this.infreaestructuras=infrs;
        });
      }
    }else{
      this.getInfraestructuras();
    }
  }
  eliminarInfraestructura(event:number){
    this._infraestructuraService.borrarInfraestructura(event).subscribe(()=>{
      this.getInfraestructuras();
    })
  }
  actualizarInfraestructura(event:InfraestructuraModel){
    this.formTitle = 'Editar Infraestructura';
    this.infraestructura = event;
    this.showFormInfr = true;
  }
  crearInfraestructura(){
    this.formTitle = 'Añadir infraestructura';
    this.showFormInfr =true;
  }
  guardarInfraestructura(event:InfraestructuraModel){
    if(event.id){
      this._infraestructuraService.actualizarInfraestructura(event).subscribe(()=>{
        this.getInfraestructuras();
        this.reset();
      });
    }else{
      this._infraestructuraService.guardarInfraestructura(event).subscribe(()=>{
        this.getInfraestructuras();
        this.reset();
      });
    }
  }
  verInfoInfraestructura(event:InfraestructuraModel){
    this.infraestructura = event;
    this.showInfoInfr = true;
  }
  buscarInfraestructura(event:InfraestructuraModel){
    this.resultadoBusqueda = event;
    this.showResultadoBusqueda = true;
  }
  closeBusqueda(){
    this.resultadoBusqueda = null;
    this.showResultadoBusqueda = false;
  }
  reset(){
    this.showInfoInfr = false;
    this.showFormInfr = false;
    this.showResultadoBusqueda = false;
    this.resultadoBusqueda = null;
    this.formTitle = '';
    this.infraestructura = null;
  }
}
