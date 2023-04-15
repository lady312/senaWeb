import { Injectable } from '@angular/core';
import { CompetenciaModel } from '@models/competencia';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  CompetenciaModel: CompetenciaModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerCompetencia() {
    return this._coreService.get<CompetenciaModel[]>('competencia');
  }
  public getCompetenciaById(id) {
    return this._coreService.get<CompetenciaModel>('competencia/' + id);
  }

  crearCompetencia(Competencia: CompetenciaModel) {
    Competencia.nombreCompetencia = Competencia.nombreCompetencia.toUpperCase();
    Competencia.detalle = Competencia.detalle.toUpperCase();
    return this._coreService.post<CompetenciaModel>('competencia', Competencia);
  }

  eliminarCompetencia(competenciaId: number) {
    return this._coreService.delete('competencia/' + competenciaId);
  }

  actualizarCompetencia(compe: CompetenciaModel) {
    compe.nombreCompetencia = compe.nombreCompetencia.toUpperCase();
    compe.detalle = compe.detalle.toUpperCase();
    return this._coreService.put('competencia/' + compe.id, compe);
  }
}
