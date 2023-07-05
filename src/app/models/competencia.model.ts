import { ActividadAprendizajeModel } from "./actividad-aprendizaje.model";

export interface CompetenciaModel {

  id: number;
  nombreCompetencia: string;
  codigoCompetencia: string;
  idActividadProyecto:number;
  actividadProyecto?:ActividadAprendizajeModel;
    
}
