import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { CompetenciaRapModel } from '@models/competencia_rap.model';

@Injectable({
  providedIn: 'root'
})
export class CompetenciaRapService {

  constructor(
    private _coreService: CoreService
  ) { }

  public getCompetenciaRapByCompetencia(id: number) {
    return this._coreService.get<CompetenciaRapModel[]>('competenciaRap/competencia/' + id);
  }
}
