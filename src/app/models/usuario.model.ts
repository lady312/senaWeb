import { ActivationCompanyUserModel } from './activation-company-user.model';
import { CompanyModel } from './company.model';
import { PersonaModel } from './persona.model';
import { RolModel } from './rol.model';

export interface UsuarioModel {
  id: number;
  email: string;
  contrasena: string;

  idPersona?:number;
  persona?:PersonaModel;

  company_id?: number;
  company?:CompanyModel;

  user?:ActivationCompanyUserModel

  roles?: RolModel[];

}
