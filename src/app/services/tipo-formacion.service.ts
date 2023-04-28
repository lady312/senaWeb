import { Injectable } from '@angular/core';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { CoreService } from './core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoFormacionService {
  
  private headerCustom?: HttpHeaders;
  permisos: number;
  grupos: any[];
  url = `http://127.0.0.1:8000/api/`;

  constructor(private http: HttpClient, private _coreService: CoreService) { }

  public traerTipoFormaciones() {
    return this._coreService.get<TipoFormacionModel[]>('tipo_formaciones');
  }

}
