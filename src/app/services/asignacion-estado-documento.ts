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

  obtenerComentarios(): Observable<any> {
    return this.coreService.get<any>('asignacion');
  }
  subirComentario(comentario: string) {
    const body = { comentario: comentario };
    return this.coreService.post( 'comentario', { body: body });
  }
  
  actualizarComentario(idAlmacenDocumento: number, comentario: string) {
    const url = `comentarios/actualizar`;
    const body = {
      idAlmacenDocumento: idAlmacenDocumento,
      comentario: comentario
    };

    return this.coreService.post(url, body);
  }

}