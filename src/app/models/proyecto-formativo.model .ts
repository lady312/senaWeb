import { CentroFormacionModel } from "./centro-formacion.model";
import { ProgramaModel } from "./programa.model";

export interface ProyectoFormativoModel {
    id?: number;
    nombre: string;
    codigo:string;
    idPrograma?:number;
    tiempoEstimado:number;
    numeroTotalRaps:number;
    idCentroFormacion:number;

    Programas?:ProgramaModel;
    centroFormativo?:CentroFormacionModel;
  }