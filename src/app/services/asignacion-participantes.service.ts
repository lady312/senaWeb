
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class AsignacionParticipantesService {

  constructor(private coreService: CoreService) {}

  obtenerProgramas(): Observable<any[]> {
    return this.coreService.get<any[]>('programas');
  }

  obtenerGruposPorPrograma(idPrograma: number): Observable<any[]> {
    return this.coreService.get<any[]>(`asignacionParticipantes/programas/${idPrograma}/grupos`);
  }

  obtenerAprendicesPorGrupo(idGrupo: number): Observable<any[]> {
    return this.coreService.get<any[]>(`asignacionParticipantes/grupos/${idGrupo}/aprendices`);
  }

  obtenerAprendicesActivos(): Observable<any[]> {
    return this.coreService.get<any[]>('usuarios_aprendices');
  }
}
