import { Injectable } from '@angular/core';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoAprendizajeService  {
  rap: ResultadoAprendizajeModel;
  constructor(
    private _coreService: CoreService
  ) { }
  public traerRap() {
    return this._coreService.get<ResultadoAprendizajeModel[]>('resultadoAprendizaje');
  }


  public Raps() {
    return this._coreService.get<ResultadoAprendizajeModel[]>('resultadoAprendizaje');  ///////7
  }


  crearRaps(rap: ResultadoAprendizajeModel) {
    rap.rap=rap.rap.toUpperCase();
    rap.codigoRap=rap.codigoRap.toUpperCase();
    return this._coreService.post<ResultadoAprendizajeModel[]>('resultadoAprendizaje', rap);
    
  
  }
  eliminarRaps(rapId: number) {
    return this._coreService.delete('resultadoAprendizaje/' + rapId);
  }
  actualizarRaps(rap: ResultadoAprendizajeModel) {
    return this._coreService.put('resultadoAprendizaje/' + rap.id, rap);
  }

}
