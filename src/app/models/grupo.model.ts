import { TipoGrupoModel } from '@models/tipogrupo.model';
import { InfraestructuraModel } from './infraestructura.model';
import { TipoOfertaModel } from './tipo-oferta.model';
import { TipoFormacionModel } from './tipo-formacion.model';
import { NivelFormacionModel } from './nivel-formacion.model';
import { ProgramaModel } from './programa.model';
import { UsuarioModel } from './usuario.model';
import { EstadoGrupoModel } from './estado-grupo.model';
import { AsignacionJornadaGrupoModel } from './asignacion-jornada-grupo.model';
export interface GrupoModel {
  id: number;
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

}

