import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsignacionParticipantesService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  obtenerProgramas() {
    return this.http.get<any[]>(`${this.apiUrl}/programas`);
  }

  obtenerGruposPorPrograma(idPrograma: number) {
    return this.http.get<any[]>(`${this.apiUrl}/asignacionParticipantes/programas/${idPrograma}/grupos`);
  }
}
