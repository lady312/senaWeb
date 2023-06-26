import { Component, OnInit} from "@angular/core";
import { CalendarioModel } from "@models/calendario.model";
import { SedeModel } from "@models/sede.model";
import { SedeService } from "@services/sede.service";
import { CiudadService } from "@services/ciudad.service";
import { CiudadModel } from "@models/ciudad.model";
import { DepartamentoModel } from "@models/departamento.model";
import { DepartamentoService } from "@services/departamento.service";
import { GrupoModel } from "@models/grupo.model";
import { GruposService } from "@services/grupo.service";
import { ProgramaModel } from "@models/programa.model";
import { ProgramaService } from "@services/programa.service";
import { InfraestructuraModel } from "@models/infraestructura.model";
import { InfraestructuraService } from "@services/infraestructura.service";
import { AreaService } from "@services/area.service";
import { AreaModel } from "@models/area.model";
import { JornadaService } from "@services/jornada.service";
import { JornadaModel } from "@models/jornada.model";
import { UsuarioModel } from "@models/usuario.model";
import { AsignacionJornadaGrupoModel } from "@models/asignacion-jornada-grupo.model";
import { TipoGrupoService } from "@services/tipo-grupo.service";
import { TipoGrupoModel } from "@models/tipogrupo.model";
import { NivelFormacionModel } from "@models/nivel-formacion.model";
import { NivelFormacionService } from "@services/nivel-formacion.service";
import { EstadoGrupoService } from "@services/estado-grupo.service";
import { EstadoGrupoModel } from "@models/estado-grupo.model";
import { TipoFormacionService } from "@services/tipo-formacion.service";
import { TipoFormacionModel } from "@models/tipo-formacion.model";
import { TipoOfertaModel } from "@models/tipo-oferta.model";
import { TipoOfertaService } from "@services/tipo-oferta.service";
import { CentroFormacionModel } from "@models/centro-formacion.model";
import { CentroFormacionService } from "@services/centro-formacion.service";

@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.scss"],
})
export class CalendarioComponent implements OnInit {

  protected showFormSede: boolean = false;
  protected showModalGrupo = false;
  protected showModalPrograma: boolean = false;
  protected showFormInfr: boolean = false;
  protected showCalendar: boolean = false;
  protected showModalJornada: boolean = false;

  sede: SedeModel = null;
  grupo: GrupoModel = null;
  programa: ProgramaModel = null;
  area: AreaModel = null;
  jornada: JornadaModel = null;

  jornadas: JornadaModel[] = [];

  calendarios: CalendarioModel[] = [];
  sedes: SedeModel[] = [];
  centrosFormacion: CentroFormacionModel[] = [];
  ciudades: CiudadModel[] = [];
  departamentos: DepartamentoModel[] = [];
  grupos: GrupoModel[] = [];
  programas: ProgramaModel[] = [];
  infraestructuras: InfraestructuraModel[] = [];
  areas: AreaModel[] = [];
  infreaestructuras: InfraestructuraModel[] = [];
  usuarios: UsuarioModel[] = [];
  gruposJornada: AsignacionJornadaGrupoModel[] = [];
  tipoGrupos: TipoGrupoModel[] = [];
  niveles: NivelFormacionModel[] = [];
  estadoGrupos: EstadoGrupoModel[] = [];
  tipoFormaciones: TipoFormacionModel[] = [];
  tipoOfertas: TipoOfertaModel[] = [];

  constructor(
    private _sedeService: SedeService,
    private _ciudadService: CiudadService,
    private _centroFormacionService: CentroFormacionService,
    private _departamentoService: DepartamentoService,
    private _gruposService: GruposService,
    private _programaService: ProgramaService,
    private _infraestructuraService: InfraestructuraService,
    private _areaService: AreaService,
    private _jornadaService: JornadaService,
    private _tipoGruposService: TipoGrupoService,
    private _nivelFormacionService: NivelFormacionService,
    private _estadoGrupoService: EstadoGrupoService,
    private _tipoFormacionService: TipoFormacionService,
    private _tipoOfertaService: TipoOfertaService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.sedes = await this.getSedes();
  }

  /**cargar datos */
  async getSedes(): Promise<SedeModel[]> {
    try {
      let sedes = await this._sedeService.traerSedes().toPromise();
      return sedes;
    } catch (error) {
      console.log(error);
    }
  }

  async getCiudades(): Promise<CiudadModel[]> {
    try {
      let ciudades = await this._ciudadService.traerCiudades().toPromise();
      return ciudades;
    } catch (error) {
      console.log(error);
    }
  }

  async getDepartamento(): Promise<DepartamentoModel[]> {
    try {
      let departamentos = await this._departamentoService.traerDepartamentos().toPromise();
      return departamentos;
    } catch (error) {
      console.log(error);
    }
  }

  async getCentrosFormacion(): Promise<CentroFormacionModel[]>{
    try {
      let centrosFormacion = await this._centroFormacionService.traerCentroFormacion().toPromise();
      return centrosFormacion;
    } catch (error) {
      console.log(error);
    }
  }

  async getGrupos(): Promise<GrupoModel[]> {
    try {
      let grupos = await this._gruposService.traerGrupos().toPromise();
      return grupos;
    } catch (error) {
      console.log(error);
    }
  }

  async getTipoGrupos(): Promise<TipoGrupoModel[]> {
    try {
      let tipoGrupos = await this._tipoGruposService.traerTipoGrupos().toPromise();
      return tipoGrupos;
    } catch (error) {
      console.log(error);
    }
  }

  async getNiveles(): Promise<NivelFormacionModel[]> {
    try {
      let niveles = await this._nivelFormacionService.traerNivelesFormacion().toPromise();
      return niveles;
    } catch (error) {
      console.log(error);
    }
  }

  async getEstados(): Promise<EstadoGrupoModel[]> {
    try {
      let estados = await this._estadoGrupoService.traerEstadoGrupos().toPromise();
      return estados;
    } catch (error) {
      console.log(error);
    }
  }

  async getTipoFormaciones():Promise<TipoFormacionModel[]> {
    try {
      let tiposFormacion = await this._tipoFormacionService.traerTipoFormaciones().toPromise();
      return tiposFormacion;
    } catch (error) {
      console.log(error);
    }
  }

  async getTipoOfertas(): Promise<TipoOfertaModel[]> {
    try {
      let tipoOfertas = await this._tipoOfertaService.traerTipoOfertas().toPromise();
      return tipoOfertas;
    } catch (error) {
      console.log(error);
    }
  }

  async getProgramas():Promise<ProgramaModel[]> {
    try {
      let programas = await this._programaService.traerProgramas().toPromise();
      return programas;
    } catch (error) {
      console.log(error);
    }
  }

  async getInfraestructuras():Promise<InfraestructuraModel[]> {
    try {
      let infraestructuras = await this._infraestructuraService.traerInfraestructuras().toPromise();
      return infraestructuras;
    } catch (error) {
      console.log(error);
    }
  }

  async getAreas():Promise<AreaModel[]> {
    try {
      let areas = await this._areaService.traerAreas().toPromise();
      return areas;
    } catch (error) {
      console.log(error);
    }
  }

  async getJornadas():Promise<JornadaModel[]> {
    try {
      let jornadas = await this._jornadaService.traerJornada().toPromise();
      return jornadas;
    } catch (error) {
      console.log(error);
    }
  }
  /**Fin traer data*/

  /**Filtrar data */
  async getGrupoById(event: number):Promise<void> {
    try {
      this.grupo = await this._gruposService.traerGrupo(event).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async getByIdInfra(event: number):Promise<void> {
    try {
      this.grupos = await this._gruposService.traerGrupoByIdInfra(event).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async filterBySede(event: number):Promise<void> {
    this.infreaestructuras = await this.getInfrsBySede(event);
    if(!this.infreaestructuras){
      this.grupos = [];
      return;
    }
    this.getByIdSede(event);
    
  }
  async getInfrsBySede(event: number):Promise<InfraestructuraModel[]> {
    if(event==0){
      let infrs = [];
      return infrs;
    }
    try {
      let infrs = await this._infraestructuraService.infrBySede(event).toPromise();
      return infrs;
    } catch (error) {
      console.log(error);
    }
  }
  async getByIdSede(event: number):Promise<GrupoModel[]> {
    try {
      let grupos = await this._gruposService.traerGrupoByIdSede(event).toPromise();
      return grupos;
    } catch (error) {
      console.log(error);
    }
  }
  /**Fin filtrar data */

  /**control modales*/
  //sede
  async createSede():Promise<void> {
    this.ciudades = await this.getCiudades();
    this.centrosFormacion = await this.getCentrosFormacion();
    this.sede = null;
    this.showFormSede = true;
  }
  closeFormSede(){
    this.showFormSede = false;
  }

  //infraestructura
  async createInfra() {
    this.areas = await this.getAreas();
    this.showFormInfr = true;
  }
  closeFormInfra(){
    this.showFormInfr = false;
  }

  //programa
  createPrograma() {
    this.programa = null;
    this.showModalPrograma = true;
  }
  closeFormPrograma(){
    this.showModalPrograma = false;
  }

  //grupos
  async createGrupo() {
    this.tipoFormaciones = await this.getTipoFormaciones();
    this.jornadas = await this.getJornadas();
    this.programas = await this.getProgramas();
    this.niveles = await this.getNiveles();
    this.tipoGrupos = await this.getTipoGrupos();
    this.estadoGrupos = await this.getEstados();
    this.tipoOfertas = await this.getTipoOfertas();
    this.infreaestructuras = await this.getInfraestructuras();
    this.grupo = null;
    this.showModalGrupo = true;
  }
  closeFormGrupo(){
    this.showModalGrupo = false;
  }

  //jornadas
  createJornada() {
    this.jornada = null;
    this.showModalJornada = true;
  }
  closeFormJornada(){
    this.showModalJornada = false;
  }
  /**fin control modales*/

  /**Guardar nuevos registros */
  async guardarSede(sede: SedeModel):Promise<void> {
    try {
      await this._sedeService.guardarSede(sede).toPromise();
      this.closeFormSede();
    } catch (error) {
      console.log(error);
    }
  }
  async guardarGrupo(grupo: GrupoModel):Promise<void> {
    try {
      await this._gruposService.crearGrupo(grupo).toPromise();
      this.closeFormGrupo();
    } catch (error) {
      console.log(error);
    }
  }
  async guardarProgramas(programa: ProgramaModel):Promise<void> {
    try {
      await this._programaService.crearProgramas(programa).toPromise();
      this.closeFormPrograma();
    } catch (error) {
      console.log(error);
    }
  }
  async guardarJornada(event: JornadaModel):Promise<void> {
    try {
      await this._jornadaService.crearJornada(event).toPromise();
      this.closeFormJornada();
    } catch (error) {
      console.log(error);
    }
  }
  async guardarInfraestructura(event: InfraestructuraModel):Promise<void> {
    try {
      await this._infraestructuraService.guardarInfraestructura(event).toPromise();
      this.closeFormInfra();
    } catch (error) {
      console.log(error);
    }
  }
  /**Fin guardar registros */

  //Eliminar
  reset() {
    this.sede = null;
    this.showFormSede = false;
    this.grupo = null;
    this.showModalGrupo = false;
    this.programa = null;
    this.showModalPrograma = false;
    this.showFormInfr = false;
    this.jornada = null;
    this.showModalJornada = false;
  }
}
