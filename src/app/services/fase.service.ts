import { Injectable } from '@angular/core';
import { FaseModel } from '@models/fase.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class FaseService {

  fase: FaseModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerFase() {
    return this._coreService.get<FaseModel[]>('fases');
  }




  crear(fase: FaseModel) {

    fase.nombreFase = fase.nombreFase.toUpperCase();
    fase.codigoFase = fase.codigoFase.toUpperCase();
    return this._coreService.post<FaseModel>('fases', fase);
  }


  eliminarFase(faseId: number) {
    return this._coreService.delete('fases/' + faseId);
  }

  actualizarFase(fase: FaseModel) {
    fase.nombreFase = fase.nombreFase.toUpperCase();
    fase.codigoFase = fase.codigoFase.toUpperCase();
    return this._coreService.put('fases/' + fase.id, fase);
  }}
