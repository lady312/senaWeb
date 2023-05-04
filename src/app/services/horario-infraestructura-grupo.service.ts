import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HorarioInfraestructuraGrupo } from '@models/horario-infraestructura-grupo.model';

@Injectable({
  providedIn: 'root'
})
export class HorarioInfraestructuraGrupoService {

  constructor(
    private _coreService: CoreService
  ) { }
  traerHorarioInfraestructuraGrupo(){
    return this._coreService.get<HorarioInfraestructuraGrupo[]>('horario_infraestructura_grupo');
  }
  crearHorarioInfraestructuraGrupo(horarioInfraestructuraGrupo:HorarioInfraestructuraGrupo){
    return this._coreService.post<HorarioInfraestructuraGrupo>('horario_infraestructura_grupo',horarioInfraestructuraGrupo);
  }
}
