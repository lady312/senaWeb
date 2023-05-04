import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';

export interface HorarioInfraestructuraGrupo {
  id?: number;
  idGrupo?: number;
  idInfraestructura?: number;
  fechaInicial?: Date; //Debe ser requerido alert
  fechaFinal?:Date;
  infraestructura?: InfraestructuraModel;
  grupo?: GrupoModel;
}