// import { ProgramaModel } from '@models/programa.model';
import { JornadaModel } from '@models/jornada.model';
import { GrupoModel } from './grupo.model';
import { EstadoGrupoModel } from './estado-grupo.model';
import { PersonaModel } from './persona.model';
import { ProyectoFormativoModel } from './proyecto-formativo.model ';

export interface MatriculaModel {
  id?: number;
  idGrupo?:GrupoModel[];
  idEstadoGrupo?:EstadoGrupoModel[];
  idPersona?:PersonaModel[];
  idJornada?:JornadaModel[];
  idProyectoFormativo?:ProyectoFormativoModel[];
  // idPrograma?:ProgramaModel[];
  ficha?:string;
  cedula?:string;
  fechaInicial: Date;
  fechaAceptacion: Date;
}
