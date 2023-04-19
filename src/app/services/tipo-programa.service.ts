import { Injectable } from '@angular/core';
import { TipoProgramaModel } from '@models/tipo-programa.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class TipoProgramaService {

  tipoPrograma: TipoProgramaModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerTipoPrograma() {
    return this._coreService.get<TipoProgramaModel[]>('tipo_programas');
  }




  crearTipoPrograma(tipoPrograma: TipoProgramaModel) {

    tipoPrograma.nombreTipoPrograma = tipoPrograma.nombreTipoPrograma.toUpperCase();
    tipoPrograma.descripcion = tipoPrograma.descripcion.toUpperCase();
    return this._coreService.post<TipoProgramaModel>('tipo_programas', tipoPrograma);
  }


  eliminarTipoPrograma(tipoProgramaId: number) {
    return this._coreService.delete('tipo_programas/' + tipoProgramaId);
  }

  actualizarTipoPrograma(tipoPrograma: TipoProgramaModel) {
    tipoPrograma.nombreTipoPrograma = tipoPrograma.nombreTipoPrograma.toUpperCase();
    tipoPrograma.descripcion = tipoPrograma.descripcion.toUpperCase();
    return this._coreService.put('tipo_programas/' + tipoPrograma.id, tipoPrograma);
  }

}
