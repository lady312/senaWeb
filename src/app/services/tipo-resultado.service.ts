import { Injectable } from '@angular/core';
import { TipoResultadoAprendizajeModel } from '@models/tipo-resultado.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class TipoResultadoService {

  tipoResultado: TipoResultadoAprendizajeModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerTipoResultado() {
    return this._coreService.get<TipoResultadoAprendizajeModel[]>('tipo_resultados');
  }
}
