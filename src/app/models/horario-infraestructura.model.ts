import { GrupoModel } from "./grupo.model";
import { InfraestructuraModel } from "./infraestructura.model";

export interface HorarioInfrModel {
    id?:number;

    idGrupo?:number;
    idInfraestructura?:number;

    fechaInicial:Date;
    fechaFinal:Date;

    infraestructura?:InfraestructuraModel;
    grupo?:GrupoModel;
}