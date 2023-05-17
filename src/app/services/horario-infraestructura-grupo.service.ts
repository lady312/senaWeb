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

  traerHorarioInfraestructuraGrupo() {
    return this._coreService.get<HorarioInfraestructuraGrupo[]>('horario_infraestructura_grupo');
  }

  public getHorarioInfraestructuraByGrupo(id: number) {
    return this._coreService.get<HorarioInfraestructuraGrupo[]>('horario_infraestructura_grupo/grupo/' + id);
  }

  crearHorarioInfraestructuraGrupo(id: HorarioInfraestructuraGrupo) {
    return this._coreService.post<HorarioInfraestructuraGrupo>('horario_infraestructura_grupo', id);
  }

}
