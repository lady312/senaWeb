import { GrupoModel } from './grupo.model';
import { UsuarioModel } from './usuario.model';

export interface AsignacionParticipanteModel {
  id: number;
  idGrupo?: number;
grupo:GrupoModel;

  idParticipante: number;

  // grupo
  participante?: UsuarioModel[];
}