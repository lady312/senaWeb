import { Component, OnInit } from "@angular/core";
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
import { UINotificationService } from "@services/uinotification.service";
import { error } from "console";

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
    private _uiNotificationService: UINotificationService
  ) { }

  ngOnInit() {
    this.getSedes();
  }

  /**cargar datos */
  getSedes() {
    this._sedeService.traerSedes().subscribe((sedes) => {
      this.sedes = sedes;
    }, (error) => {
      console.log(error);
    });
  }

  async getCiudades():Promise<CiudadModel[]> {
    try {
      let ciudades = await this._ciudadService.traerCiudades().toPromise();
      return ciudades;
    } catch (error) {
      console.log(error);
    }
  }

  getDepartamento() {
    this._departamentoService.traerDepartamentos().subscribe((departamentos) => {
      this.departamentos = departamentos;
    }, (error) => {
      console.log(error);
    });
  }

  getCentrosFormacion() {
    this._centroFormacionService.traerCentroFormacion().subscribe((cFormacion) => {
      this.centrosFormacion = cFormacion;
    }, (error) => {
      console.log(error);
    })
  }

  getGrupos() {
    this._gruposService.traerGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    }, (error) => {
      console.log(error);
    })
  }

  getTipoGrupos() {
    this._tipoGruposService.traerTipoGrupos().subscribe((tGrupos) => {
      this.tipoGrupos = tGrupos;
    }, (error) => {
      console.log(error);
    })
  }

  getNiveles() {
    this._nivelFormacionService.traerNivelesFormacion().subscribe((niveles) => {
      this.niveles = niveles;
    }, (error) => {
      console.log(error);
    })
  }

  getEstados() {
    this._estadoGrupoService.traerEstadoGrupos().subscribe((estados) => {
      this.estadoGrupos = estados;
    }, (error) => {
      console.log(error);
    });
  }

  getTipoFormaciones() {
    this._tipoFormacionService.traerTipoFormaciones().subscribe((tFormaciones) => {
      this.tipoFormaciones = tFormaciones;
    }, (error) => {
      console.log(error);
    })
  }

  getTipoOfertas() {
    this._tipoOfertaService.traerTipoOfertas().subscribe((tOfertas) => {
      this.tipoOfertas = tOfertas;
    }, (error) => {
      console.log(error);
    });
  }

  getProgramas() {
    this._programaService.traerProgramas().subscribe((programas) => {
      this.programas = programas;
    }, (error) => {
      console.log(error);
    });
  }

  getInfraestructuras() {
    this._infraestructuraService.traerInfraestructuras().subscribe((infrs) => {
      this.infraestructuras = infrs;
    }, (error) => {
      console.log(error);
    });
  }

  getAreas() {
    this._areaService.traerAreas().subscribe((areas) => {
      this.areas = areas;
    }, (error) => {
      console.log(error);
    })
  }

  getJornadas() {
    this._jornadaService.traerJornada().subscribe((jornadas) => {
      this.jornadas = jornadas;
    }, (error) => {
      console.log(error);
    })
  }
  /**Fin traer data*/

  /**Filtrar data */
  async getGrupoById(event: number): Promise<void> {
    try {
      this.grupo = await this._gruposService.traerGrupo(event).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async getByIdInfra(event: number): Promise<void> {
    try {
      this.grupos = await this._gruposService.traerGrupoByIdInfra(event).toPromise();
    } catch (error) {
      console.log(error);
    }
  }

  async filterBySede(event: number): Promise<void> {
    this.infraestructuras = await this.getInfrsBySede(event);
    if (!this.infraestructuras) {

      this.grupos = [];
      return;
    }
    this.grupos = await this.getByIdSede(event);

  }
  async getInfrsBySede(event: number): Promise<InfraestructuraModel[]> {
    if (event == 0) {
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
  async getByIdSede(event: number): Promise<GrupoModel[]> {
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
    this.getCentrosFormacion();
    this.sede = null;
    this.showFormSede = true;
  }
  closeFormSede() {
    this.showFormSede = false;
  }

  //infraestructura
  createInfra() {
    this.getAreas();
    this.showFormInfr = true;
  }
  closeFormInfra() {
    this.showFormInfr = false;
  }

  //programa
  createPrograma() {
    this.programa = null;
    this.showModalPrograma = true;
  }
  closeFormPrograma() {
    this.showModalPrograma = false;
  }

  //grupos
  async createGrupo() {
    this.getTipoFormaciones();
    this.getJornadas();
    this.getProgramas();
    this.getNiveles();
    this.getTipoGrupos();
    this.getEstados();
    this.getTipoOfertas();
    this.getInfraestructuras();
    this.grupo = null;
    this.showModalGrupo = true;
  }
  closeFormGrupo() {
    this.showModalGrupo = false;
  }

  //jornadas
  createJornada() {
    this.jornada = null;
    this.showModalJornada = true;
  }
  closeFormJornada() {
    this.showModalJornada = false;
  }
  /**fin control modales*/

  /**Guardar nuevos registros */
  guardarSede(sede: SedeModel) {
    this._sedeService.guardarSede(sede).subscribe(() => {
      this.closeFormSede();
    }, (error) => {
      console.log(error)
    });
  }
  guardarGrupo(grupo: GrupoModel){
    this._gruposService.crearGrupo(grupo).subscribe(()=>{
      this.closeFormGrupo();
    },(error)=>{
      this._uiNotificationService.error(error.error.error);
    });
  }
  guardarProgramas(programa: ProgramaModel){
    this._programaService.crearProgramas(programa).subscribe(()=>{
      this.closeFormPrograma();
    },(error)=>{
      console.log(error);
    })
  }
  guardarJornada(event: JornadaModel){
    this._jornadaService.crearJornada(event).subscribe(()=>{
      this.closeFormJornada();
    },(error)=>{
      console.log(error);
    });
  }
  guardarInfraestructura(event: InfraestructuraModel){
    this._infraestructuraService.guardarInfraestructura(event).subscribe(()=>{
      this.closeFormInfra();
    },(error)=>{
      console.log(error);
    })
  }
  /**Fin guardar registros */
}
