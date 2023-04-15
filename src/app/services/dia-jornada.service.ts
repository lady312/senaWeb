import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { DiaJornadaModel } from '@models/dia_jornada.model';

@Injectable({
  providedIn: 'root'
})
export class DiaJornadaService {

  constructor(
    private _coreService: CoreService
  ) { }

  public getDiaJornadaByJornada(id: number) {
    return this._coreService.get<DiaJornadaModel[]>('diajornada/jornada/' + id);
  }

}
