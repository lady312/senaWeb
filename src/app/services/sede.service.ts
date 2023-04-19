import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { SedeModel } from '@models/sede.model';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(
    private _coreService: CoreService
  ) { }

  //retorna todas las sedes
  traerSedes(){
    return this._coreService.get<SedeModel[]>('sedes');
  }
  //retorna la sede segun su id
  traerSede(id:number){
    const url:string=`sedes/${id}`;
    return this._coreService.get<SedeModel>(url);
  }
  //trae las sedes pasandole la id de la ciudad
  sedesByCiudad(idCiudad:number){
    const url:string=`sedes/ciudad/${idCiudad}`;
    return this._coreService.get<SedeModel[]>(url);
  }
  //borra una sede de la base datos al pasarle su id
  borrarSede(id:number){
    const url:string=`sedes/${id}`;
    return this._coreService.delete(url);
  }
  //crea un area nueva en la base de datos
  guardarSede(sede:SedeModel){
    sede.nombreSede=sede.nombreSede.toUpperCase();
    sede.direccion=sede.direccion.toUpperCase();
    sede.telefono=sede.telefono.toUpperCase();
    sede.descripcion=sede.descripcion.toLowerCase();
    return this._coreService.post<SedeModel>('sedes',sede);
  }
  //modifica una sede existente
  actualizarSede(sede:SedeModel){
    const url:string=`sedes/${sede.id}`;
    sede.nombreSede=sede.nombreSede.toUpperCase();
    sede.direccion=sede.direccion.toUpperCase();
    sede.telefono=sede.telefono.toUpperCase();
    sede.descripcion=sede.descripcion.toLowerCase();
    return this._coreService.put(url,sede);
  }

}
