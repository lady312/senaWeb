import { Injectable } from '@angular/core';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { CoreService } from './core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoOfertaService {
  
  private headerCustom?: HttpHeaders;
  permisos: number;
  grupos: any[];
  url = `http://127.0.0.1:8000/api/`;

  constructor(private http: HttpClient, private _coreService: CoreService) { }

  public traerTipoOfertas() {
    return this._coreService.get<TipoOfertaModel[]>('tipo_ofertas');
  }

}
