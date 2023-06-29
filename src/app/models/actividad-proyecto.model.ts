import { FaseModel } from "./fase.model";

export interface ActividadProyectoModel {
    id?: number;
    nombreActividadProyecto: string;
    idFase?:number
    codigoAP:string;

    fase?: FaseModel;
  }