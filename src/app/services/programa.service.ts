import { Injectable } from '@angular/core';
import { ProgramaModel } from '@models/programa.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  Programa: ProgramaModel;




  constructor(
    private _coreService: CoreService,

  ) { }

  public traerProgramas(params = {},) {
    return this._coreService.get<ProgramaModel[]>('programas');
  }


  crearProgramas(programa: ProgramaModel) {
    programa.nombrePrograma = programa.nombrePrograma.toUpperCase();
    programa.codigoPrograma= programa.codigoPrograma.toUpperCase();
    programa.descripcionPrograma = programa.descripcionPrograma.toUpperCase();
    programa.idTipoPrograma = programa.idTipoPrograma;
    programa.idEstado = programa.idEstado;
    programa.totalHoras = programa.totalHoras;
    programa.etapaLectiva = programa.etapaLectiva;
    programa.etapaProductiva = programa.etapaProductiva;
    programa.creditosLectiva = programa.creditosLectiva;
    programa.creditosProductiva = programa.creditosProductiva

    return this._coreService.post<ProgramaModel>('programas', programa);
  }

  eliminarProgramas(programaId: number) {
    return this._coreService.delete('programas/' + programaId);
  }

  
  actualizarProgramas(programa: ProgramaModel) {

    return this._coreService.put('programas/' + programa.id, programa);
  }
}
