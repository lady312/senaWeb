import { CiudadModel } from '@models/ciudad.model';
import { EstadoModel } from '@models/estado.model';
import { TipoIdentificacionModel } from '@models/tipo-identificacion.model';

export interface AsignacionRolPersonaModel {
    id?: number;

    estado?: EstadoModel;
}
