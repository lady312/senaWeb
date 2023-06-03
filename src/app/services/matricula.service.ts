import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatriculaModel } from '@models/matricula.model';
import { PersonaModel } from '@models/persona.model';

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

  crearMatricula(matricula: MatriculaModel)
  {
    this._coreService.post<MatriculaModel>('matriculas', matricula);
  }

  actualizarMatricula(matricula: MatriculaModel)
  {

    return this._coreService.put('matriculas' + matricula.id, matricula);

  }

  eliminarMatricula(id: number)
  {

    this._coreService.delete('matriculas/' + id);

  }


}
