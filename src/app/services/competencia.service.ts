import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { CompetenciaModel } from '@models/competencia.model';
import { CoreService } from './core.service';


@Injectable({
  providedIn: 'root'
})

export class CompetenciaService {
  competencia: CompetenciaModel;
  permisos: number;
=======
import { CompetenciaModel } from '@models/competencia';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {

  CompetenciaModel: CompetenciaModel;

>>>>>>> e25b57a366c7850aeb9e7f10cff6aef013825696
  constructor(
    private _coreService: CoreService
  ) { }

<<<<<<< HEAD
  public traerRol() {
    return this._coreService.get<CompetenciaModel[]>('competencias');
  }

  public rolBynombre(id: number) {
    return this._coreService.get('competencia/' + this.competencia.id);
  }

  crearCompetencia(competencia: CompetenciaModel) {
    return this._coreService.post<CompetenciaModel>('competencias/', competencia);
  }

  actualizarCompetencia(competencia: CompetenciaModel) {
    return this._coreService.put('competencias/' + competencia.id, competencia);
  }

  eliminarCompetencia(competenciaId: number) {
    return this._coreService.delete('competencias/' + competenciaId);
  }

=======
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
>>>>>>> e25b57a366c7850aeb9e7f10cff6aef013825696
}
