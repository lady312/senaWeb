import { JornadaModel } from './jornada.model';
import { ProgramaModel } from './programa.model';
import { UsuarioModel } from './usuario.model';
import { InfraestructuraModel } from './infraestructura.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { NivelFormacionModel } from './nivel-formacion.model';
import { TipoFormacionModel } from './tipo-formacion.model';
import { TipoOfertaModel } from './tipo-oferta.model';
import { EstadoGrupoModel } from './estado-grupo.model';

export interface GrupoModel {
  id: number;
  nombre: string;
  fechaInicial: Date;
  fechaFinal: Date;
  observacion: string;

  idTipoGrupo: number;
  tipogrupo?: TipoGrupoModel;

  idLider: number;
  lider?: UsuarioModel;

  idPrograma: number;
  programa?: ProgramaModel;
 
  idInfraestructura: number;
  infraestructura?: InfraestructuraModel;

  idNivel:number;
  nivel?:NivelFormacionModel;

  idTipoFormacion:number;
  tipoFormacion?:TipoFormacionModel;

  idEstado:number;
  estado?:EstadoGrupoModel;

  idTipoOferta:number;
  tipoOferta?:TipoOfertaModel;
  
}
