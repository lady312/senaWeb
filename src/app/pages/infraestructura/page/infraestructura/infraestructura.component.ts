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

  //Almacena consultas previas para evitar que se hagan demaciadas consultas
  private cache = new Map<number, {
    areas:AreaModel[],
    sedes:SedeModel[],
    infrsSedeArea:Map<number,
      Map<number,{
        infrs:InfraestructuraModel[]
      }>> 
  }>();

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
    this.iniciarCache();
    this.getInfraestructuras();
    this.getCiudades();
    this.getAreas();
    this.getSedes();
  }
  iniciarCache(){
    this.cache.set(0,{
      areas:null,
      sedes:null,
      infrsSedeArea:new Map<number, 
        Map<number,{
          infrs:InfraestructuraModel[]
        }>>()});
    this.cache.get(0).infrsSedeArea.set(0,new Map<number,{
      infrs:InfraestructuraModel[]}>());
    this.cache.get(0).infrsSedeArea.get(0).set(0,{infrs:null});
  }
  getInfraestructuras(){
    const cacheInfrs:InfraestructuraModel[] = this.cache.get(0).infrsSedeArea.get(0).get(0).infrs;
    if(cacheInfrs){
      if(this.infreaestructuras!==cacheInfrs){
        this.infreaestructuras=cacheInfrs;
      }
    }else{
      this._infraestructuraService.traerInfraestructuras().subscribe(infrs=>{
        this.infreaestructuras=infrs;
        this.cache.get(0).infrsSedeArea.get(0).get(0).infrs=this.infreaestructuras;
      },error=>{
        this._uiNotificationService.error('Error de Conexión');
      });
    }
 
  }

  getCiudades(){
    this._ciudadService.traerCiudades().subscribe(ciudades=>{
      this.ciudades=ciudades;
    },error=>{
      this._uiNotificationService.error('Error de conexión ciudades')
    });
  }
  getSedes(){
    const cacheSedes:SedeModel[]=this.cache.get(0).sedes;
    if(cacheSedes){
      if(this.sedes!==cacheSedes){
        this.sedes=cacheSedes;
      }
    }else{
      this._sedeService.traerSedes().subscribe(sedes=>{
        this.sedes=sedes;
        this.cache.get(0).sedes=this.sedes;
      },error=>{
        this._uiNotificationService.error('Error de conexión sedes');
      });
    }

  }
  getAreas(){
    const cacheAreas:AreaModel[]=this.cache.get(0).areas;
    if(cacheAreas){
      if(this.areas!==cacheAreas){
        this.areas=cacheAreas;
      }
    }else{
      this._areaService.traerAreas().subscribe(areas=>{
        this.areas=areas;
        this.cache.get(0).areas=this.areas;
      },error=>{
        this._uiNotificationService.error('Error de conexión areas');
      });
    }
  }
  getSedesByCiudad(idCiudad:number){
    this.getSedes();
    this.getInfraestructuras();
    const ciudad:CiudadModel=this.ciudades.find(ciudad=>ciudad.id==idCiudad);
    if(ciudad){
      const cacheCiudad = this.cache.get(idCiudad);
      if(cacheCiudad){
        this.sedes = cacheCiudad.sedes;
        this.infreaestructuras = cacheCiudad.infrsSedeArea.get(0).get(0).infrs;
      }else{
        const sedes:SedeModel[] = this.sedes.filter(sede=>(sede.idCiudad==idCiudad));
        let infrs:InfraestructuraModel[]=[];
        sedes.forEach(sede=>{
          infrs=infrs.concat(this.infreaestructuras.filter(infr=>(infr.idSede==sede.id)));
        });
        if(infrs){
          this.infreaestructuras=infrs;
        }else{
          this.infreaestructuras=[];
        }
        this.sedes=sedes;
        this.cache.set(idCiudad,{sedes:this.sedes,areas:this.areas,infrsSedeArea:new Map<number,Map<number,{infrs:InfraestructuraModel[]}>>()});
        this.cache.get(idCiudad).infrsSedeArea.set(0,new Map<number,{infrs:InfraestructuraModel[]}>());
        this.cache.get(idCiudad).infrsSedeArea.get(0).set(0,{infrs:this.infreaestructuras});
      }
    }else{
      this.sedes=this.cache.get(0).sedes;
      this.infreaestructuras=this.cache.get(0).infrsSedeArea.get(0).get(0).infrs;
    }
  }

  filtrarInfraestructuras(SedeArea:{idSede:number,idArea:number}){
    this.getInfraestructuras();
    this.getSedes();
    const sede:SedeModel = this.sedes.find(sede=>(sede.id==SedeArea.idSede));
    const area:AreaModel = this.areas.find(area=>(area.id==SedeArea.idArea));
    if(sede && area){
      this.filtrarPorSedeYArea(sede,area);
    }else if(sede){
      this.filtrarPorsede(sede);
    }else if(area){
      this.filtrarPorArea(area);
    }else{
      this.getInfraestructuras();
    }
  }
  filtrarPorSedeYArea(sede:SedeModel,area:AreaModel){
    const idCiudad:number = sede.idCiudad;
    const cacheCiudad = this.cache.get(idCiudad);
    if(cacheCiudad){
      const cacheSede = cacheCiudad.infrsSedeArea.get(sede.id);
      if(cacheSede){
        const cacheArea = cacheSede.get(area.id);
        if(cacheArea){
          const cacheInfrs = cacheArea.infrs;
          if(this.infreaestructuras!==cacheInfrs){
            this.infreaestructuras=cacheInfrs;
          }
        }else{
          const infrs = this.infreaestructuras.filter(infr=>
            (infr.idSede==sede.id)&&(infr.idArea==area.id));
          if(infrs){
            this.infreaestructuras=infrs;
          }else{
            this.infreaestructuras=[];
          }
          this.cache.get(idCiudad).sedes=this.sedes;
          this.cache.get(idCiudad).areas=this.areas;
          this.cache.get(idCiudad).infrsSedeArea
              .get(sede.id).set(area.id,{infrs:this.infreaestructuras});
        }
      }else{
        const infrs = this.infreaestructuras.filter(infr=>
          (infr.idSede==sede.id)&&(infr.idArea==area.id));
        if(infrs){
          this.infreaestructuras=infrs;
        }else{
          this.infreaestructuras=[];
        }
        this.cache.get(idCiudad).sedes=this.sedes;
        this.cache.get(idCiudad).areas=this.areas;
        this.cache.get(idCiudad).infrsSedeArea
            .set(sede.id,new Map<number,{infrs:InfraestructuraModel[]}>())
        this.cache.get(idCiudad).infrsSedeArea
            .get(sede.id).set(area.id,{infrs:this.infreaestructuras});
      }
    }else{
      const infrs = this.infreaestructuras.filter(infr=>
        (infr.idSede==sede.id)&&(infr.idArea==area.id));
      if(infrs){
        this.infreaestructuras=infrs;
      }else{
        this.infreaestructuras=[];
      }
      this.cache.set(idCiudad,{
        areas:this.areas,
        sedes:this.sedes,
        infrsSedeArea:new Map<number,
        Map<number,{infrs:InfraestructuraModel[]}>>()
      })
      this.cache.get(idCiudad).infrsSedeArea
          .set(sede.id,new Map<number,{infrs:InfraestructuraModel[]}>())
      this.cache.get(idCiudad).infrsSedeArea
          .get(sede.id).set(area.id,{infrs:this.infreaestructuras});
    }
  }
  filtrarPorsede(sede:SedeModel){
    const idCiudad:number = sede.idCiudad;
    const cacheCiudad = this.cache.get(idCiudad);
    if(cacheCiudad){
      const cacheSede = cacheCiudad.infrsSedeArea.get(sede.id);
      if(cacheSede){
        const cacheInfrs = cacheSede.get(0).infrs;
        if(this.infreaestructuras!==cacheInfrs){
          this.infreaestructuras=cacheInfrs;
        }
      }else{
        const infrs = this.infreaestructuras.filter(infr=>
          infr.idSede==sede.id);
        if(infrs){
          this.infreaestructuras=infrs;
        }else{
          this.infreaestructuras=[];
        }
        this.cache.get(idCiudad).infrsSedeArea.set(sede.id,
          new Map<number,{infrs:InfraestructuraModel[]}>());
        this.cache.get(idCiudad).infrsSedeArea.get(sede.id)
            .set(0,{infrs:this.infreaestructuras});
      }
    }else{
      const infrs = this.infreaestructuras.filter(infr=>
        infr.idSede==sede.id);
      if(infrs){
        this.infreaestructuras=infrs;
      }else{
        this.infreaestructuras=[];
      }
      this.cache.set(idCiudad,{
        areas:this.areas,
        sedes:this.sedes,
        infrsSedeArea:new Map<number,Map<number,{infrs:InfraestructuraModel[]}>>()
      });
      this.cache.get(idCiudad).infrsSedeArea.set(sede.id,
        new Map<number,{infrs:InfraestructuraModel[]}>());
      this.cache.get(idCiudad).infrsSedeArea.get(sede.id)
          .set(0,{infrs:this.infreaestructuras});
    }
  }
  filtrarPorArea(area:AreaModel){
    const cacheArea = this.cache.get(0).infrsSedeArea.get(0).get(area.id);
    if(cacheArea){
      const cacheInfrs = cacheArea.infrs
      if(this.infreaestructuras!==cacheInfrs){
        this.infreaestructuras=cacheInfrs;
      }
    }else{
      const infrs=this.infreaestructuras.filter(infr=>
        infr.idArea==area.id
      );
      if(infrs){
        this.infreaestructuras=infrs;
      }else{
        this.infreaestructuras=[];
      }
      this.cache.get(0).infrsSedeArea.get(0).set(area.id,{infrs:this.infreaestructuras});
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
  guardarInfraestructura(event:InfraestructuraModel){
    console.log(event);
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
  crearInfraestructura(){
    this.formTitle = 'Añadir infraestructura';
    this.showFormInfr =true;
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
