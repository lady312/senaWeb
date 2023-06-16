import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatriculaModel } from '@models/matricula.model';
import { PersonaModel } from '@models/persona.model';
import { delay, switchMap, debounceTime, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  constructor(
    private _coreService: CoreService,
    private http: HttpClient,
  ) { }

  personByIdentificacion(identificacion: number): Observable<PersonaModel[]> {
    const url: string = `person_by_identificacion/${identificacion}`;
    return this._coreService.get<PersonaModel[]>(url);
  }

  numeroFichaByGrupo(numeroFicha: number): Observable<MatriculaModel[]>{
    const url: string = `numero_ficha_by_grupo/${numeroFicha}`;
    return this._coreService.get<MatriculaModel[]>(url);
  }

  asignarPersona(personId: number): Observable<any> {
    return this._coreService.post<MatriculaModel>('matricula/' + personId + '/asignar-persona', personId);
  }



  crearMatricula(matricula: MatriculaModel)
  {
    this._coreService.post<MatriculaModel>('matriculas', matricula);
  }

  actualizarMatricula(matricula: MatriculaModel)
  {

    return this._coreService.put('matriculas/' + matricula.id, matricula);

  }

  eliminarMatricula(id: number)
  {

    this._coreService.delete('matriculas/' + id);

  }


}
