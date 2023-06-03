import { ResultadoAprendizajeModel } from './resultado-aprendizaje.model';
import { CompetenciaModel } from './competencia.model';


export interface CompetenciaRapModel {
  id: number;
  idCompetencia: number;
  idRap: number;

// objetos de competencia programa
  competencia: CompetenciaModel[];
  rapModel: ResultadoAprendizajeModel[];
}
