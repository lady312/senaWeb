import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreService } from './core.service';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _coreService: CoreService
  ) { }



  public traerUsuarios() {
    return this._coreService.get<ActivationCompanyUserModel[]>('usuarios');
  }

  public traerUsuariosActives() {
    return this._coreService.get<ActivationCompanyUserModel[]>('usuarios');
  }

  public actualizarUsuario(usuario: ActivationCompanyUserModel) {
    return this._coreService.put('usuarios/' + usuario.id, usuario);

  }

  public crearUsuario(usuario: ActivationCompanyUserModel) {

    return this._coreService.post<ActivationCompanyUserModel>('usuarios', usuario);
  }


  public asignarRoles(data: any): Observable<Object[]> {
    return this._coreService
      .put('asignar_roles', data)
      .pipe(map(response => response as Object[]));
  }

  public eliminarUsuario(userId: number) {

    return this._coreService.delete('usuarios/' + userId);

  }

}
