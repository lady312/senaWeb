import { TipoGrupoModel } from '@models/tipogrupo.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { ProgramaModel } from '@models/programa.model';
import { UsuarioModel } from '@models/usuario.model';
import { HorarioInfraestructuraGrupo } from '@models/horario-infraestructura-grupo.model';
import { AsignacionParticipanteModel } from '@models/asignacion-participante.model';
import { JornadaModel } from './jornada.model';
import { InfraestructuraModel } from './infraestructura.model';
import { HorarioInfrModel } from './horario-infraestructura.model';
export interface GrupoModel {

  id?: number;
  nombre: string;
  fechaInicialGrupo: Date;
  fechaFinalGrupo: Date;
  observacion: string;

  nombreJornada?:string;

  idTipoGrupo?: number;
  tipo_grupo?: TipoGrupoModel;

  idLider?: number;
  lider?: UsuarioModel;

  idPrograma?: number;
  programa?: ProgramaModel;

  idNivel?:number;
  nivel_formacion?:NivelFormacionModel;

  idTipoFormacion?:number;
  tipo_formacion?:TipoFormacionModel;

  idEstado?:number;
  estado_grupo?:EstadoGrupoModel;

  idTipoOferta?:number;
  tipo_oferta?:TipoOfertaModel;

  horario_infraestructura?:HorarioInfrModel;
  infraestructuras?:InfraestructuraModel[];
  jornadas?:JornadaModel[];

  infraestructura?: HorarioInfraestructuraGrupo[];

  participantes?:AsignacionParticipanteModel[];

}