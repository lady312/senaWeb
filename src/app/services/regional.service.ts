import { Injectable } from '@angular/core';
import { RegionalModel } from '@models/RegionalModel';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class RegionalService {
  regional: RegionalModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerRegional() {
    return this._coreService.get<RegionalModel[]>('regionales');
  }

  crearRegional(regional: RegionalModel) {

    regional.nombreRegional = regional.nombreRegional.toUpperCase();
    regional.descripcion = regional.descripcion.toUpperCase();
    return this._coreService.post<RegionalModel>('regionales', regional);
  }

  eliminarRegional(regionalId: number) {
    return this._coreService.delete('regionales/' + regionalId);
  }

  actualizarRegional(regional: RegionalModel) {
    regional.nombreRegional = regional.nombreRegional.toUpperCase();
    regional.descripcion = regional.descripcion.toUpperCase();
    return this._coreService.put('regionales/' + regional.id, regional);
  }

}

