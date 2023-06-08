import { PersonaModel } from "./persona.model";
import { ProcesoModel } from "./proceso.model";

export interface Documento {
  id: number;
  rutaDocumento: string;
  fecha: string;
  idTipoDocumento: number;
  idProceso: number;
  persona: PersonaModel;
  proceso: ProcesoModel;
}