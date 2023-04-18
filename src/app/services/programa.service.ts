import { Injectable } from '@angular/core';
import { ProgramaModel } from '@models/programa.model';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  programa: ProgramaModel;

  constructor(
    private _coreService: CoreService
  ) { }

  public traerProgramas(params = {},) {
    return this._coreService.get<ProgramaModel[]>('programas');
  }
  public getPrograma(idProg:number) {
    return this._coreService.get<ProgramaModel>('programas/',idProg);
  }

  crearProgramas(programa: ProgramaModel) {
    programa.nombrePrograma = programa.nombrePrograma.toUpperCase();
    programa.codigoPrograma= programa.codigoPrograma.toUpperCase();
    programa.descripcionPrograma = programa.descripcionPrograma.toUpperCase();
    programa.idTipoPrograma = programa.idTipoPrograma;
    programa.idEstado = programa.idEstado;

    return this._coreService.post<ProgramaModel>('programas', programa);
  }


  eliminarProgramas(programaId: number) {
    return this._coreService.delete('programas/' + programaId);
  }

  
  actualizarProgramas(programa: ProgramaModel) {

    return this._coreService.put('programas/' + programa.id, programa);
  }
}
