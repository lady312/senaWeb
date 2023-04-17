import { Injectable } from '@angular/core';
import { CompetenciaModel } from '@models/competencia.model';
import { CoreService } from './core.service';


@Injectable({
  providedIn: 'root'
})

export class CompetenciaService {
  competencia: CompetenciaModel;
  permisos: number;
  constructor(
    private _coreService: CoreService
  ) { }

  public traerRol() {
    return this._coreService.get<CompetenciaModel[]>('competencias');
  }

  public rolBynombre(id: number) {
    return this._coreService.get('competencia/' + this.competencia.id);
  }

  crearCompetencia(competencia: CompetenciaModel) {
    competencia.nombreCompetencia = competencia.nombreCompetencia.toUpperCase();
    competencia.detalleCompetencia = competencia.detalleCompetencia.toUpperCase();
    return this._coreService.post<CompetenciaModel>('competencia', competencia);
  }

  actualizarCompetencia(competencia: CompetenciaModel) {
    competencia.nombreCompetencia = competencia.nombreCompetencia.toUpperCase();
    competencia.detalleCompetencia = competencia.detalleCompetencia.toUpperCase();
    return this._coreService.put('competencia/update/' + competencia.id, competencia);
  }

  eliminarCompetencia(competenciaId: number) {
    return this._coreService.delete('competencia/delete/' + competenciaId);
  }

}
