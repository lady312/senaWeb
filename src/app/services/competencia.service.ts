import { Injectable } from '@angular/core';
import { CompetenciaModel } from '@models/competencia.model';
import { CoreService } from './core.service';
import { CompetenciaComponent } from '../pages/competencias/page/competencia/competencia.component';


@Injectable({
  providedIn: 'root'
})

export class CompetenciaService {
  open(CompetenciaComponent: CompetenciaComponent) {
    throw new Error('Method not implemented.');
  }
  competencia: CompetenciaModel;
  permisos: number;
  constructor(
    private _coreService: CoreService
  ) { }

  
  public traerCompetencias() {
    return this._coreService.get<CompetenciaModel[]>('competencias');
  }



  public competencias() {
    return this._coreService.get<CompetenciaModel[]>('competencias');
  }

  crearCompetencia (competencia: CompetenciaModel) {
    competencia.nombreCompetencia=competencia.nombreCompetencia.toUpperCase();
    competencia.codigoCompetencia=competencia.codigoCompetencia.toUpperCase();

    return this._coreService.post<CompetenciaModel[]>('competencias', competencia);
  }
  eliminarCompetencia(competenciaId: number) {
    return this._coreService.delete('competencias/' + competenciaId);
  }
  actualizarCompetencia(competencia: CompetenciaModel) {
    return this._coreService.put('competencias/' + competencia.id, competencia);
  }

}
