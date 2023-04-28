import { Injectable } from '@angular/core';
import { CentroFormacionModel } from '@models/centro-formacion.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CentroFormacionService {
  centroFormacionModel: CentroFormacionModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerCentroFormacion() {
    return this._coreService.get<CentroFormacionModel[]>('centro-formacion');
  }


  crearCentroFormacion(centroFormacionModel: CentroFormacionModel) {
    centroFormacionModel.nombreCentro= centroFormacionModel.nombreCentro.toUpperCase();
    centroFormacionModel.idRegional = centroFormacionModel.idRegional;
    return this._coreService.post<CentroFormacionModel>('centro-formacion', centroFormacionModel);
  }


  eliminarCentroFormacion(centroFormacionId: number) {
    return this._coreService.delete('centro_formacion/' + centroFormacionId);
  }

  
  actualizarCentroFormacion(centroFormacion: CentroFormacionModel) {
    centroFormacion.nombreCentro = centroFormacion.nombreCentro.toUpperCase();
    return this._coreService.put('centro_formacion/' + centroFormacion.id, centroFormacion);
  }
}
