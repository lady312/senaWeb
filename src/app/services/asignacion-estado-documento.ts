import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEstadoDocumentoService {
  private apiUrl: string;

  constructor(private coreService: CoreService) {
    this.apiUrl = this.coreService.getApiUrl();
  }

actualizarEstado(estadoId: number, estado: string): Observable<any> {
  const url = `estadoDocumentos/${estadoId}`;
  const body = { nombreEstado: estado };
  console.log('Datos enviados al backend:', body);

  return this.coreService.put(url, body);
}



  getEstadoDocumento(): Observable<any> {
    const url = `estadoDocumentos/1`;
    return this.coreService.get(url);
  }
}