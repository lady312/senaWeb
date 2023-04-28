import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { GrupoJornadaModel } from '@models/grupo_jornada.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoJornadaService {

  constructor(
    private _coreService: CoreService
  ) { }
  traerGruposJornada(){
    return this._coreService.get<GrupoJornadaModel[]>('gruposjornada');
  }
}
