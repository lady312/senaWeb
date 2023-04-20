import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { ActividadAprendizajeModel } from '@models/actividad-aprendizaje.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadAprendizajeService {

  
  constructor(
    private _coreService: CoreService
  ) { }

 

  public traerActividadAprendizaje() {
    return this._coreService.get<ActividadAprendizajeModel[]>('actividadAprendizaje');
  }


  crearActividadAprendizaje(Aa: ActividadAprendizajeModel) {
    Aa.NombreAA = Aa.NombreAA.toUpperCase();
    Aa.codigoAA=Aa.codigoAA.toUpperCase();
    return this._coreService.post<ActividadAprendizajeModel>('actividadAprendizaje', Aa);
  }


  eliminarActividadAprendizaje(tipoDocId: number) {
    // const url = `${this.path}/${todoId}`;
    return this._coreService.delete('actividadAprendizaje/' + tipoDocId);
  }
  actualizarActividadAprendizaje(Aa: ActividadAprendizajeModel) {
    Aa.NombreAA = Aa.NombreAA.toUpperCase();
    return this._coreService.put('actividadAprendizaje/' + Aa.id, Aa);
  }
}
