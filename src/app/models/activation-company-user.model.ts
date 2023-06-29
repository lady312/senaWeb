import { EmpresaModel } from '@models/empresa.model';
import { RolModel } from '@models/rol.model';
import { UsuarioModel } from './usuario.model';
import { EstadoModel } from './estado.model';

export interface ActivationCompanyUserModel {
  id?: number;
  user_id: number;
  user:UsuarioModel;
  state_id: number;
  estado:EstadoModel;
  company_id: number;
  fechaInicio: string;
  fechaFin: string;
  created_at?: string;
  updated_at?: string;
  company?: EmpresaModel;
  roles: RolModel[];
}
