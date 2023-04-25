import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { CalendarioModel } from '@models/calendario.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  CalendarioModel: CalendarioModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerCalendario() {
    return this._coreService.get<CalendarioModel[]>('Calendario');
  }
  public getCalendarioById(id) {
    return this._coreService.get<CalendarioModel>('Calendario/' + id);
  }

  crearCalendario(Calendario: CalendarioModel) {
    return this._coreService.post<CalendarioModel>('Calendario', Calendario);
  }


  eliminarCalendario(CalendarioId: number) {
    return this._coreService.delete('Calendario/' + CalendarioId);
  }
  actualizarCalendario(Calendario: CalendarioModel) {
    return this._coreService.put('Calendario/' + Calendario.id, Calendario);
  }
}
