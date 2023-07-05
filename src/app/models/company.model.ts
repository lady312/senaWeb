import { RolModel } from "./rol.model"

export interface CompanyModel {
    id?:number,
    razonSocial:string,
    nit:string,
    rutaLogo:string,
    representanteLegal:string,
    digitoVerificacion:number,
    rutaLogoUrl:string

    roles?:RolModel[];
}