import { Injectable } from '@angular/core';
import { ActividadProyectoModel } from '@models/actividad-proyecto.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadProyectoService {

  actividadProyecto: ActividadProyectoModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerActividadProyecto() {
    return this._coreService.get<ActividadProyectoModel[]>('actividad_proyecto');
  }


  crearActividadProyecto(actividadProyecto: ActividadProyectoModel) {
    actividadProyecto.nombreActividadProyecto = actividadProyecto.nombreActividadProyecto.toUpperCase();
    actividadProyecto.idFase = actividadProyecto.idFase;
    actividadProyecto.codigoAP= actividadProyecto.codigoAP.toUpperCase();
   
    return this._coreService.post<ActividadProyectoModel>('actividad_proyecto', actividadProyecto);
  }


  eliminarActividadProyecto(actividadProyectoId: number) {
    return this._coreService.delete('actividad_proyecto/' + actividadProyectoId);
  }

  
  actualizarActividadProyecto(actividadProyecto: ActividadProyectoModel) {

    return this._coreService.put('actividad_proyecto/' + actividadProyecto.id, actividadProyecto);
  }}
