import { Injectable } from '@angular/core';
import { Calendario1Model } from '@models/calendario1.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class Calendario1Service {

  calendario1Model: Calendario1Model;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerCalendario1() {
    return this._coreService.get<Calendario1Model[]>('calendario1');
  }
  public getCalendario1ById(id) {
    return this._coreService.get<Calendario1Model>('calendario1/' + id);
  }

  crearCalendario1(calendario1: Calendario1Model) {
    return this._coreService.post<Calendario1Model>('calendario1', calendario1);
  }


  eliminarCalendario1(calendario1Id: number) {
    return this._coreService.delete('calendario1/' + calendario1Id);
  }
  actualizarCalendario1(calendario1: Calendario1Model) {
    return this._coreService.put('calendario1/' + calendario1.id, calendario1);
  }
}
