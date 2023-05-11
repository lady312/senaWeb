import { DiaJornadaModel } from '@models/dia_jornada.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { AsignacionJornadaGrupoModel } from '@models/asignacion-jornada-grupo.model';
import { JornadaModel } from './jornada.model';
import { InfraestructuraModel } from './infraestructura.model';
import { ProgramaModel } from './programa.model';
import { UsuarioModel } from './usuario.model';
export interface GrupoModel {
  id?: number;
  nombre: string;
  fechaInicial: Date;
  fechaFinal: Date;
  observacion: string;

  idTipoGrupo?: number;
  tipo_grupo?: TipoGrupoModel;

  idLider?: number;
  lider?: UsuarioModel;

  idPrograma?: number;
  programa?: ProgramaModel;

  idInfraestructura?: number;
  infraestructura?: InfraestructuraModel;

  idNivel?:number;
  nivel_formacion?:NivelFormacionModel;

  idTipoFormacion?:number;
  tipo_formacion?:TipoFormacionModel;

  idEstado?:number;
  estado_grupo?:EstadoGrupoModel;

  idTipoOferta?:number;
  tipo_oferta?:TipoOfertaModel;

  grupos_jornada?:AsignacionJornadaGrupoModel[];

  diaJor?: DiaJornadaModel[];

}
