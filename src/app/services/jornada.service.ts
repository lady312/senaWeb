import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { JornadaModel } from '@models/jornada.model';

@Injectable({
  providedIn: 'root'
})
export class JornadaService {

  JornadaModel: JornadaModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerJornada() {
    return this._coreService.get<JornadaModel[]>('jornada');
  }
  public getJornadaById(id) {
    return this._coreService.get<JornadaModel>('jornada/' + id);
  }

  crearJornada(Jornada: JornadaModel) {
    Jornada.nombreJornada = Jornada.nombreJornada.toUpperCase();
    Jornada.descripcionJornada = Jornada.descripcionJornada.toUpperCase();
    Jornada.descripcionJornada = Jornada.descripcionJornada.toUpperCase();
    Jornada.dias = Jornada.dias.toUpperCase();
    return this._coreService.post<JornadaModel>('jornada', Jornada);
  }

  eliminarJornada(JornadaId: number) {
    return this._coreService.delete('jornada/' + JornadaId);
  }

  actualizarJornada(Jorn: JornadaModel) {
    Jorn.nombreJornada = Jorn.nombreJornada.toUpperCase();
    Jorn.descripcionJornada = Jorn.descripcionJornada.toUpperCase();
    Jorn.dias = Jorn.dias.toUpperCase();
    return this._coreService.put('jornada/' + Jorn.id, Jorn);
  }
}
