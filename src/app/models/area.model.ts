import { InfraestructuraModel } from "./infraestructura.model";

export interface AreaModel {
    id?: number;
    nombreArea:string;
    codigo:string;

    infraestructuras?:InfraestructuraModel[];
}
