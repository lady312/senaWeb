import { Injectable } from '@angular/core';
import { ResultadoModel } from '@models/resultado.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  ResultadoModel: ResultadoModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerResultado() {
    return this._coreService.get<ResultadoModel[]>('resultado');
  }
  public getResultadoById(id) {
    return this._coreService.get<ResultadoModel>('resultado/' + id);
  }

  crearResultado(Resultado: ResultadoModel) {
    Resultado.nombreResultado = Resultado.nombreResultado.toUpperCase();
    Resultado.detalleResultado = Resultado.detalleResultado.toUpperCase();
    return this._coreService.post<ResultadoModel>('resultado', Resultado);
  }

  eliminarResultado(ResultadoId: number) {
    return this._coreService.delete('resultado/' + ResultadoId);
  }

  actualizarResultado(Resul: ResultadoModel) {
    Resul.nombreResultado = Resul.nombreResultado.toUpperCase();
    Resul.detalleResultado = Resul.detalleResultado.toUpperCase();
    return this._coreService.put('resultado/' + Resul.id, Resul);
  }
}
