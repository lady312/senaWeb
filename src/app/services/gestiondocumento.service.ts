import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestiondocumentoService {

  constructor(private coreService: CoreService) {}

  obtenerDocumentos(): Observable<any> {
    return this.coreService.get<any>('documentos');
  }

  guardarDocumento(documento: FormData) {
    return this.coreService.post<any>('documentos/subir', documento);
  }

  cargarDocumento(idDocumento: number, archivo: File): Observable<any> {
    const url = `documentos/${idDocumento}/cargar`;
    const formData = new FormData();
    formData.append('rutaDocumento', archivo);
    return this.coreService.post(url, formData);
  }
  
 
  capturarurl(documentoId: number): string {
    const baseUrl = this.coreService.getApiUrl().replace(/\/$/, '');
    const url = `${baseUrl}/documentos/${documentoId}/ver`;
    return url;
  }
  

  capturdocumento(idDocumento: number): string {
    const url = `documentos/${idDocumento}/cargar`;
    return url;
  }

  
}
