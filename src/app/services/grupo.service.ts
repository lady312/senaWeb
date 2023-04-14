import { Injectable } from '@angular/core';
import { GrupoModel } from '@models/grupo.model';
import { CoreService } from './core.service';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  // tipoDocumento: RolModel;
  private headerCustom?: HttpHeaders;
  permisos: number;
  grupos: any[];
  url = `http://127.0.0.1:8000/api/`;

  constructor(private http: HttpClient, private _coreService: CoreService) { }

  getGrupo(id: number): Observable<any> {
    return this.http.get(`${this.url}/grupos/${id}`);
  }

  searchGrupos(query: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + `/obtenergrupos?grupo=` + `${query}`);
  }

  public traerGrupos() {
    return this._coreService.get<GrupoModel[]>('grupos');
  }

  crearGrupo(grupo: GrupoModel) {
    grupo.nombre       = grupo.nombre.toUpperCase();
    grupo.fechaInicial = grupo.fechaInicial;
    grupo.fechaFinal   = grupo.fechaFinal;
    grupo.observacion  = grupo.observacion.toUpperCase();
    grupo.idTipoGrupo  = grupo.idTipoGrupo;
    grupo.tipogrupo    = grupo.tipogrupo;

    return this._coreService.post<GrupoModel>('grupos', grupo);
  }

  eliminarGrupo(tipoDocId: number) {
    return this._coreService.delete('grupos/' + tipoDocId);
  }

  actualizarGrupo(grupo: GrupoModel) {
    grupo.nombre       = grupo.nombre.toUpperCase();
    grupo.fechaInicial = grupo.fechaInicial;
    grupo.fechaFinal   = grupo.fechaFinal;
    grupo.observacion  = grupo.observacion.toUpperCase();
    grupo.idTipoGrupo  = grupo.idTipoGrupo;
    return this._coreService.put('grupos/' + grupo.id, grupo);
  }

}