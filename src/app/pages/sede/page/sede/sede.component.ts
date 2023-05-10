import { Component, OnInit } from '@angular/core';
import { CentroFormacionModel } from '@models/centro-formacion.model';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { SedeModel } from '@models/sede.model';
import { CentroFormacionService } from '@services/centro-formacion.service';
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

  //Almacena consultas previas para evitar que se hagan demaciadas consultas
  private cache = new Map<number, { 
    ciudades: CiudadModel[], 
    sedesPorCiudad: Map<number, { 
      sedes: SedeModel[] }> 
  }>();

  protected showFormSede:boolean = false;
  protected formTitle:string;
  protected showInfoSede:boolean = false;
  protected showResultadoBusqueda:boolean=false;
  protected resultadoBusqueda:SedeModel=null;

  sede:SedeModel;
  sedes:SedeModel[]=[];

  centrosFormacion:CentroFormacionModel[]=[];
  departamentos:DepartamentoModel[]=[];
  ciudades:CiudadModel[]=[];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _sedeService: SedeService,
    private _departamentoService: DepartamentoService,
    private _ciudadService: CiudadService,
    private _centroFormacionService:CentroFormacionService
  ){}
  ngOnInit():void{
    this.iniciarCache();
    this.getSedes();
    this.getCiudades();
    this.getDepartametos();
    this.getCentrosFormacion();
  }
  iniciarCache(){
    this.cache.set(0, { 
      ciudades: null, 
      sedesPorCiudad: new Map<number, { 
        sedes: SedeModel[] 
    }>() });
  }
  getSedes(){
    const sedesPorCiudad = this.cache.get(0).sedesPorCiudad.get(0);
    if(sedesPorCiudad && sedesPorCiudad.sedes){
      const cacheSedes:SedeModel[]=sedesPorCiudad.sedes
      if(this.sedes!==cacheSedes){
        this.sedes=cacheSedes;
      }
    }else{
      this._sedeService.traerSedes().subscribe(sedes=>{
        this.sedes=sedes;
        this.cache.get(0).sedesPorCiudad.set(0,{sedes:this.sedes});
      },error=>{
        this._uiNotificationService.error("Error de Conexión en sedes");
      });
    }
  }
  getCentrosFormacion(){
    this._centroFormacionService.traerCentroFormacion().subscribe(centrosF=>{
      this.centrosFormacion=centrosF;
    })
  }
  getCiudades(){
    const cacheCiudades:CiudadModel[] = this.cache.get(0).ciudades;
    if(cacheCiudades){
      if(this.ciudades!==cacheCiudades){
        this.ciudades=cacheCiudades;
      }
    }else{
      this._ciudadService.traerCiudades().subscribe(ciudades=>{
        this.ciudades=ciudades;
        this.cache.get(0).ciudades=this.ciudades;
      },error=>{
        this._uiNotificationService.error("Error de conexión en ciudades");
      })
    }
  }
  getDepartametos(){
    this._departamentoService.traerDepartamentos().subscribe(departamentos=>{
      this.departamentos=departamentos;
    },error=>{
      this._uiNotificationService.error("Error de conexión en departamentos");
    });
  }
  getSedesByCiudad(idCiudad:number){
    this.getSedes();
    const ciudad:CiudadModel = this.ciudades.find(ciudad=>(ciudad.id==idCiudad));
    if(ciudad){
      const idDep:number = ciudad.idDepartamento;
      const cacheByDep= this.cache.get(idDep);

      if(cacheByDep){
        const cacheByCiudad = cacheByDep.sedesPorCiudad.get(idCiudad);
        if(cacheByCiudad){
          const cacheSedes:SedeModel[]=cacheByCiudad.sedes;
          if(this.sedes!==cacheSedes){
            this.sedes=cacheSedes;
          }
        }else{
          this.sedes=this.sedes.filter(sede=>(sede.idCiudad==idCiudad));
          this.cache.get(idDep).sedesPorCiudad.set(idCiudad,{sedes:this.sedes});
        }
      }else{
        const cacheCiudades:CiudadModel[]=this.ciudades.filter(ciudad=>
          ciudad.idDepartamento==idDep);
        const cacheSedes:SedeModel[]=this.sedes.filter(sede=>
          (sede.idCiudad==idCiudad));
        this.sedes=cacheSedes;
        this.cache.set(idDep,{
          ciudades:cacheCiudades,
          sedesPorCiudad:new Map<number, { 
            sedes: SedeModel[] 
        }>()});
        this.cache.get(idDep).sedesPorCiudad.set(idCiudad,{sedes:cacheSedes});
      }
    }else{
      this.sedes=this.cache.get(0).sedesPorCiudad.get(0).sedes;
    }
    
  }
  getCiudadesByDep(idDep:number){
    this.getSedes();
    this.getCiudades();
    const dep:DepartamentoModel= this.departamentos.find(dep=>(dep.id==idDep));
    if(dep){
      const cacheDep = this.cache.get(idDep);
      if(cacheDep){
        this.ciudades = cacheDep.ciudades;
        this.sedes = cacheDep.sedesPorCiudad.get(0).sedes;
      }else{
        const ciudades:CiudadModel[] = this.ciudades.filter(ciudad=>(ciudad.idDepartamento==idDep));
        let sedes:SedeModel[] = [];
        ciudades.forEach(ciudad=>{
          sedes=sedes.concat(this.sedes.filter(sede=>(sede.idCiudad==ciudad.id)));
        });
        if(sedes){
          this.sedes=sedes;
        }else{
          this.sedes=[];
        }
        this.ciudades=ciudades;
        this.cache.set(idDep,{
          ciudades:ciudades,
          sedesPorCiudad:new Map<number, { 
            sedes: SedeModel[] 
        }>()})
        this.cache.get(idDep).sedesPorCiudad.set(0,{sedes:this.sedes});
      }
    }else{
      this.ciudades=this.cache.get(0).ciudades;
      this.sedes=this.cache.get(0).sedesPorCiudad.get(0).sedes;
    }
    
  }
  eliminarSede(event:number){
    this._sedeService.borrarSede(event).subscribe(()=>{
      this.cache=new Map<number, { 
        ciudades: CiudadModel[], 
        sedesPorCiudad: Map<number, { 
          sedes: SedeModel[] }> 
      }>();
      this.iniciarCache();
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
        new Map<number, { 
          ciudades: CiudadModel[], 
          sedesPorCiudad: Map<number, { 
            sedes: SedeModel[] }> 
        }>();
        this.iniciarCache();
        this.getSedes();
        this.reset();
      });
    }else{
      this._sedeService.guardarSede(event).subscribe(()=>{
        new Map<number, { 
          ciudades: CiudadModel[], 
          sedesPorCiudad: Map<number, { 
            sedes: SedeModel[] }> 
        }>();
        this.iniciarCache();
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
    this.showResultadoBusqueda=false
    this.showInfoSede=false;
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
  cancelarBusqueda(){
    this.getSedes();
  }
}
