import { EstadoModel } from "./estado.model";
import { ResultadoAprendizajeModel } from "./resultado-aprendizaje.model";

export interface ActividadAprendizajeModel {
  id: number;
  NombreAA: string;
  codigoAA: string;
  idEstado: number;
  estado?:EstadoModel;
  idRap: number;
  rap?:ResultadoAprendizajeModel;
}
