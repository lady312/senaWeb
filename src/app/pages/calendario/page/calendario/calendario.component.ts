import { Component, OnInit, OnChanges, ChangeDetectorRef, ViewChild } from "@angular/core";
import { CalendarioModel } from "@models/calendario.model";
import { SedeModel } from "@models/sede.model";
import { UINotificationService } from "@services/uinotification.service";
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
import { Time } from "@angular/common";
import { UsuarioService } from "@services/usuario.service";
import { UsuarioModel } from "@models/usuario.model";
import { AsignacionJornadaGrupoModel } from "@models/asignacion-jornada-grupo.model";
import { AsignacionJornadaGrupoService } from "@services/asignacion-jornada-grupo.service";
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
import { ListCalendarioComponent } from "../../components/list-calendario/list-calendario.component";

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
  formTitle: string = 'Añadir Infraestructura';
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

  
  async createSede():Promise<void> {
    this.ciudades = await this.getCiudades();
    this.sede = null;
    this.showFormSede = true;
  }
  createGrupo() {
    this.grupo = null;
    this.showModalGrupo = true;
  }

  createPrograma() {
    this.programa = null;
    this.showModalPrograma = true;
  }
  createInfra() {
    this.infraestructuras = null;
    this.showFormInfr = true;
  }
  createJornada() {
    this.jornada = null;
    this.showModalJornada = true;
  }

  guardarSede(sede: SedeModel) {
    this._sedeService.guardarSede(sede).subscribe(() => {
      this.sede = sede;
      this.showFormSede = false;
    });
  }
  guardarGrupo(grupo: GrupoModel) {
    if (grupo.id) {
      this._gruposService.actualizarGrupo(grupo).subscribe((gr) => {
        this.getGrupos();
        this.reset();
      });
    } else {
      this._gruposService.crearGrupo(grupo).subscribe((gr) => {
        this.getGrupos();
        this.reset();
      });
    }
  }

  guardarProgramas(programa: ProgramaModel) {
    this._programaService.crearProgramas(programa).subscribe(() => {
      this.reset();
    });
  }

  guardarJornada(event: JornadaModel) {
    this._jornadaService.crearJornada(event).subscribe(() => {
      this.getJornadas();
      this.reset();
    });
  }

  guardarInfraestructura(event: InfraestructuraModel) {

    this._infraestructuraService
      .guardarInfraestructura(event)
      .subscribe(() => {
        this.getInfraestructuras();
        this.reset();
      });

  }

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
