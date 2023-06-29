import { ResultadoAprendizajeModel } from './resultado-aprendizaje.model';
import { CompetenciaModel } from './competencia.model';
import { ResultadoAprendizajeModule } from '../pages/resultado-aprendizaje/resultado-aprendizaje.module';


export interface CompetenciaRapModel {
  id: number;
  idCompetencia: number;
  idRap: number;

// objetos de competencia programa
  competencia: CompetenciaModel[];
  rapModel: ResultadoAprendizajeModel;
}
