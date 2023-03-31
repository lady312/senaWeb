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

  eliminarCompetencia(CompetenciaId: number) {
    return this._coreService.delete('competencia/' + CompetenciaId);
  }

  actualizarCompetencia(Compe: CompetenciaModel) {
    Compe.nombreCompetencia = Compe.nombreCompetencia.toUpperCase();
    Compe.detalle = Compe.detalle.toUpperCase();
    return this._coreService.put('competencia/' + Compe.id, Compe);
  }
}
