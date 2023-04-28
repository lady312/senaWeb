import { ProgramaModel } from '@models/programa.model';
import { UsuarioModel } from '@models/usuario.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { EstadoGrupoModel } from '@models/estado-grupo.model';

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
