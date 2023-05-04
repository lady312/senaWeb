import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { AsignacionParticipanteModel } from '@models/asignacion-participante.model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionParticipanteService {

  constructor(
    private _coreService: CoreService
  ) { }
  traerAsignacionParticipantes(){
    return this._coreService.get<AsignacionParticipanteModel[]>('asignacion_participante');
  }
  crearAsignacionParticipante(asignacionParticipante:AsignacionParticipanteModel){
    return this._coreService.post<AsignacionParticipanteModel>('asignacion_participante', asignacionParticipante);
  }
}
