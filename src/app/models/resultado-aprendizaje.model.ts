import { CompetenciaModel } from "./competencia.model";
import { TipoResultadoAprendizajeModel } from "./tipo-resultado.model";

export interface ResultadoAprendizajeModel {
  id: number;
  rap: string;
  codigoRap: string;
  numeroHoras:number;
  idTipoRaps:number;
  tipoRaps?:TipoResultadoAprendizajeModel;
  idCompetencia:number;
  competencias?:CompetenciaModel[];
}

