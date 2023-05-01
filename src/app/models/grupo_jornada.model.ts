import { JornadaModel } from '@models/jornada.model';
import { GrupoModel } from './grupo.model';
export interface GrupoJornadaModel {
  id?: number,
  idGrupo?: number,
  idJornada?: number,
  jornada?: JornadaModel;
  grupo?: GrupoModel;
}
