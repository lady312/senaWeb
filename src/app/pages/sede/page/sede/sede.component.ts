import { Component, OnInit } from '@angular/core';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { SedeModel } from '@models/sede.model';
import { CiudadService } from '@services/ciudad.service';
import { DepartamentoService } from '@services/departamento.service';
import { SedeService } from '@services/sede.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.scss']
})
export class SedeComponent implements OnInit{

  protected showFormSede:boolean = false;
  protected formTitle:string;
  protected showInfoSede:boolean = false;
  protected showResultadoBusqueda:boolean=false;
  protected resultadoBusqueda:SedeModel=null;

  sede:SedeModel;
  sedes:SedeModel[]=[];

  departamentos:DepartamentoModel[]=[];
  ciudades:CiudadModel[]=[];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _sedeService: SedeService,
    private _departamentoService: DepartamentoService,
    private _ciudadService: CiudadService
  ){}

  ngOnInit():void{
    this.getSedes();
    this.getDepartametos();
  }
  getSedes(){
    this._sedeService.traerSedes().subscribe(sedes=>{
      this.sedes=sedes;
    },error=>{
      this._uiNotificationService.error("Error de Conexión");
    })
  }
  getDepartametos(){
    this._departamentoService.traerDepartamentos().subscribe(departamentos=>{
      this.departamentos=departamentos;
    });
  }
  getCiudadesByDep(idDep:number){
    if(idDep>0){
      this._ciudadService.ciudadesByDep(idDep).subscribe(ciudades=>{
        this.ciudades=ciudades;
      });
    }else{
      this.ciudades=[];
    }
  }
  getSedesByCiudad(idCiudad:number){
    if(idCiudad>0){
      this._sedeService.sedesByCiudad(idCiudad).subscribe(sedes=>{
        this.sedes=sedes;
      });
    }else{
      this.getSedes();
    }
  }
  eliminarSede(event:number){
    this._sedeService.borrarSede(event).subscribe(()=>{
      this.getSedes();
    })
  }

  actualizarSede(event:SedeModel){
    this.formTitle='Editar sede';
    this.sede=event;
    this.showFormSede=true;
  }

  crearSede(){
    this.showFormSede=true;
    this.formTitle='Añadir sede';
  }

  guardarSede(event:SedeModel){
    if(event.id){
      this._sedeService.actualizarSede(event).subscribe(()=>{
        this.getSedes();
        this.reset();
      });
    }else{
      this._sedeService.guardarSede(event).subscribe(()=>{
        this.getSedes();
        this.reset();
      })
    }
  }
  verInfoSede(event:SedeModel){
    this.sede=event;
    this.showInfoSede = true;
  }
  buscarSede(event:SedeModel){
    this.showResultadoBusqueda=true;
    this.resultadoBusqueda=event;
  }
  closeBusqueda(){
    this.showResultadoBusqueda=false;
    this.resultadoBusqueda=null;
  }
  reset(){
    this.showInfoSede = false;
    this.showFormSede = false;
    this.showResultadoBusqueda=false;
    this.resultadoBusqueda=null;
    this.formTitle = '';
    this.sede=null;
  }

}
