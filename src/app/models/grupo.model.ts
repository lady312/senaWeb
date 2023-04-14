import { TipoGrupoModel } from "@models/tipogrupo.model";
export interface GrupoModel {
  id: number;
  nombre: string;
  fechaInicial: Date,
  fechaFinal: Date,
  observacion: string;
  
  idTipoGrupo: number;
  tipogrupo?: TipoGrupoModel;
}
