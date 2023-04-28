import { GrupoModel } from './grupo.model';
import { JornadaModel } from './jornada.model';

export interface AsignacionJornadaGrupoModel {
  id: number;
  idGrupo?: number;
  idJornada: number;

  // grupo
  jornada?: JornadaModel[];
}