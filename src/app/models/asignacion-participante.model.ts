import { GrupoModel } from './grupo.model';
import { UsuarioModel } from './usuario.model';

export interface AsignacionParticipanteModel {
  id: number;
  idGrupo?: number;
  idParticipante: number;

  // grupo
  participante?: UsuarioModel[];
}