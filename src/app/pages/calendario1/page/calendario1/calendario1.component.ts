import { Component, OnInit } from '@angular/core';
import { Calendario1Model } from '@models/calendario1.model';
import { SedeModel } from '@models/sede.model';
import { Calendario1Service } from '@services/calendario1.service';
import { UINotificationService } from '@services/uinotification.service';
import { SedeService } from '@services/sede.service';
import { CiudadService } from '@services/ciudad.service';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { DepartamentoService } from '@services/departamento.service';
import { GrupoModel } from '@models/grupo.model';
import { GruposService } from '@services/grupo.service';
import { ProgramaModel } from '@models/programa.model';
import { ProgramaService } from '@services/programa.service';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { InfraestructuraService } from '@services/infraestructura.service';
import { AreaService } from '@services/area.service';
import { AreaModel } from '@models/area.model';



@Component({
  selector: 'app-calendario1',
  templateUrl: './calendario1.component.html',
  styleUrls: ['./calendario1.component.scss']
})
export class Calendario1Component implements OnInit {

  protected showModalCalendario1 = false;
  protected showModalCalendario2 = false;
  protected showModalCalendario3 = false;
  protected showModalCalendario4 = false;
  protected showFormSede:boolean = false;
  protected showModalGrupo = false;
  protected showModalPrograma:boolean = false;
  protected showFormInfr:boolean = false;
  

  calendario2: Calendario1Model = null;
  calendario3: Calendario1Model = null;
  calendario4: Calendario1Model = null;
  sede: SedeModel = null;
  grupo: GrupoModel = null;
  programa : ProgramaModel = null;
  infraestructura:InfraestructuraModel =null;
  area :AreaModel = null;
  

  calendarios1: Calendario1Model[] = [];
  sedes: SedeModel[]=[];
  ciudades: CiudadModel[]=[];
  departamentos: DepartamentoModel[]=[];
  grupos: GrupoModel[]=[];
  programas: ProgramaModel[]=[];
  infraestructuras:InfraestructuraModel[]=[];
  areas : AreaModel[]=[];
  infreaestructuras:InfraestructuraModel[]=[];
  constructor(
    private _uiNotificationService: UINotificationService,
    private _calendario1Service: Calendario1Service,
    private _sedeService: SedeService,
    private _ciudadService: CiudadService,
    private _departamentoService: DepartamentoService,
    private _gruposService : GruposService,
    private _programaService :ProgramaService,
    private _infraestructuraService : InfraestructuraService,
    private _areaService : AreaService
    
    
  ) { }

  ngOnInit(): void {

    this.getCiudades();
    this.getDepartamento();
    this.getSedes();
    this.getGrupo();
    this.getPrograma();
    this.getInfraestructuras();
    this.getCiudades();
    this.getAreas();
  }

//sedes
getSedes(){
this._sedeService.traerSedes()
.subscribe(sedes =>{
  this.sedes = sedes;
})

}
getCiudades(){
  this._ciudadService.traerCiudades()
  .subscribe(ciudades =>{
    this.ciudades = ciudades;
  })
}

getDepartamento(){
  this._departamentoService.traerDepartamentos()
  .subscribe(departamentos =>{
    this.departamentos = departamentos;
  })
}

//grupos

getGrupo(){
  this._gruposService.traerGrupos()
  .subscribe(grupos =>{
    this.grupos = grupos;
  })
  
}

getPrograma() {
  this._programaService.traerProgramas()
    .subscribe(programa => {
      this.programas = programa;
    }, error => {
      this._uiNotificationService.error("Error de conexión");
    });
}

getInfraestructuras(){
  this._infraestructuraService.traerInfraestructuras()
  .subscribe(infraestructuras =>{
    this.infraestructuras =infraestructuras;
  })
}

getAreas(){
  this._areaService.traerAreas().subscribe(areas=>{
    this.areas=areas;
  });
}

getSedesByCiudad(idCiudad:number){
  this._sedeService.sedesByCiudad(idCiudad).subscribe(sedes=>{
    if(sedes){
      this.sedes=sedes;
    }else{
      this.sedes=[];
    }
  })
}
//programa
//infraestructura




 //crear
  createCalendario1() {
    this.sede = null;
    this.showFormSede = true;
  }
  createCalendario2() {
    this.grupo = null;
    this.showModalGrupo = true;
  }
 
  createCalendario3() {
    this.programa = null;
    this.showModalPrograma = true;
  }
  createCalendario4() {
  this.infraestructura = null;
  this.showFormInfr = true;
  }
 
guardarSede(sede:SedeModel){
  this._sedeService.guardarSede(sede).subscribe(()=>{
    this.sede=sede;
    this.showFormSede= false;
  })
}
guardarGrupo(grupo: GrupoModel) {
  
  if (grupo.id) {
    this._gruposService.actualizarGrupo(grupo).subscribe(gr => {
      this.getGrupo();
      this.reset();
    });
  } else {
    this._gruposService.crearGrupo(grupo).subscribe(gr => {
      this.getGrupo();
      this.reset();
    })
  }
}

guardarProgramas(programa: ProgramaModel) {
  if (programa.id) {
    this._programaService.actualizarProgramas(programa).subscribe(programa => {
      this.getPrograma();
      this.reset();
    });
  } else {
    this._programaService.crearProgramas(programa).subscribe(programa => {
      this.getPrograma();
      this.reset();
    })
  }
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

  //Eliminar
  reset() {
   
    this.sede = null;
    this.showFormSede = false;
    this.grupo = null;
    this.showModalGrupo = false;
    this.programa = null;
    this.showModalPrograma = false;
    this.showFormInfr = false;
    this.infraestructura = null;
  }
 
}
