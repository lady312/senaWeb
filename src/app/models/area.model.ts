import { InfraestructuraModel } from "./infraestructura.model";

export interface AreaModel {
    id?: number;
    iconUrl?:string;
    nombreArea:string;
    codigo:string;

    infraestructuras?:InfraestructuraModel[];
}
