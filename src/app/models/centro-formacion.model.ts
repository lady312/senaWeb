import { RegionalModel } from "./RegionalModel";

export interface CentroFormacionModel {
  id: number;
  nombreCentro: string;
  idRegional: number;
  regional?:RegionalModel;
}
