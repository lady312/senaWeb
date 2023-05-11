import { DiaModel } from './dia.model';
import { JornadaModel } from './jornada.model';


export interface DiaJornadaModel {
  id?: number;
  idDia?: number;
  idJornada?: number;

// objetos de dia y jornada
  dia?: DiaModel[];
  JornadaModel?: JornadaModel[];
}
