import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { AsignacionJornadaGrupoModel } from '@models/asignacion-jornada-grupo.model';

@Injectable({
  providedIn: 'root'
})
export class AsignacionJornadaGrupoService {

  constructor(
    private _coreService: CoreService
  ) { }

  public getGrupoJornadaByGrupo(id: number) {
    return this._coreService.get<AsignacionJornadaGrupoModel[]>('grupojornada/grupo/' + id);
  }

}
