import { Component, OnInit } from "@angular/core";
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

interface formacion {
  fecha?: Date;
  horaInicial?: Time;
  horaFinal?: Time;
}
@Component({
  selector: "app-calendario",
  templateUrl: "./calendario.component.html",
  styleUrls: ["./calendario.component.scss"],
})
export class CalendarioComponent implements OnInit {
  protected showModalCalendario = false;
  protected showModalCalendario2 = false;
  protected showModalCalendario3 = false;
  protected showModalCalendario4 = false;
  protected showFormSede: boolean = false;
  protected showModalGrupo = false;
  protected showModalPrograma: boolean = false;
  protected showFormInfr: boolean = false;
  protected showCalendar: boolean = false;
  protected showModalJornada: boolean = false;

  calendario2: CalendarioModel = null;
  calendario3: CalendarioModel = null;
  calendario4: CalendarioModel = null;
  sede: SedeModel = null;
  grupo: GrupoModel = null;
  programa: ProgramaModel = null;
  area: AreaModel = null;
  jornada: JornadaModel = null;

  jornadas: JornadaModel[] = [];

  calendarios: CalendarioModel[] = [];
  sedes: SedeModel[] = [];
  formTitle: string= 'Añadir Infraestructura';
  ciudades: CiudadModel[] = [];
  departamentos: DepartamentoModel[] = [];
  grupos: GrupoModel[] = [];
  programas: ProgramaModel[] = [];
  infraestructuras: InfraestructuraModel[] = [];
  areas: AreaModel[] = [];
  infreaestructuras: InfraestructuraModel[] = [];
  usuarios: UsuarioModel[] = [];
  gruposJornada: AsignacionJornadaGrupoModel[] = [];
  tipoGrupos:TipoGrupoModel[] = [];
  niveles:NivelFormacionModel[] = [];
  estadoGrupos:EstadoGrupoModel[] = [];
  tipoFormaciones:TipoFormacionModel[] = [];
  tipoOfertas:TipoOfertaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _sedeService: SedeService,
    private _ciudadService: CiudadService,
    private _departamentoService: DepartamentoService,
    private _gruposService: GruposService,
    private _programaService: ProgramaService,
    private _infraestructuraService: InfraestructuraService,
    private _areaService: AreaService,
    private _jornadaService: JornadaService,
    private _grupoJornadaService: AsignacionJornadaGrupoService,
    private _usuarioService: UsuarioService,
    private _tipoGruposService:TipoGrupoService,
    private _nivelFormacionService:NivelFormacionService,
    private _estadoGrupoService:EstadoGrupoService,
    private _tipoFormacionService:TipoFormacionService,
    private _tipoOfertaService:TipoOfertaService
  ) {}

  ngOnInit(): void {
    this.getCiudades();
    this.getDepartamento();
    this.getSedes();
    this.getGrupos();
    this.getPrograma();
    this.getCiudades();
    this.getAreas();
    this.getJornadas();
    this.getGruposJornada();
    this.getUsuarios();
    this.getTipoGrupos();
    this.getNiveles();
    this.getEstados();
    this.getTipoFormaciones();
    this.getTipoOfertas();
    this.getInfraestructuras()
  }

  //sedes
  getSedes() {
    this._sedeService.traerSedes().subscribe((sedes) => {
      this.sedes = sedes;
    });
  }

  getCiudades() {
    this._ciudadService.traerCiudades().subscribe((ciudades) => {
      this.ciudades = ciudades;
    });
  }

  getDepartamento() {
    this._departamentoService
      .traerDepartamentos()
      .subscribe((departamentos) => {
        this.departamentos = departamentos;
      });
  }

  //grupos
  getGrupos() {
    this._gruposService.traerGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    });
  }

  getTipoGrupos(){
    this._tipoGruposService.traerTipoGrupos().subscribe((tGrupos)=>{
      this.tipoGrupos = tGrupos;
    });
  }

  getNiveles(){
    this._nivelFormacionService.traerNivelesFormacion().subscribe((niveles)=>{
      this.niveles = niveles;
    });
  }

  getEstados(){
    this._estadoGrupoService.traerEstadoGrupos().subscribe((estados)=>{
      this.estadoGrupos = estados;
    });
  }

  getTipoFormaciones(){
    this._tipoFormacionService.traerTipoFormaciones().subscribe((tFormaciones)=>{
      this.tipoFormaciones = tFormaciones;
    });
  }

  getTipoOfertas(){
    this._tipoOfertaService.traerTipoOfertas().subscribe((tOfertas)=>{
      this.tipoOfertas = tOfertas;
    });
  }

  getGruposJornada() {
    this._grupoJornadaService
      .traerGruposJornada()
      .subscribe((gruposJornada) => {
        this.gruposJornada = gruposJornada;
      });
  }

  getPrograma() {
    this._programaService.traerProgramas().subscribe(
      (programa) => {
        this.programas = programa;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }
  getInfraestructuras() {
    this._infraestructuraService.traerInfraestructuras().subscribe((infrs)=>{
      console.log(infrs)
      this.infreaestructuras = infrs;
    })
  }

  getAreas() {
    this._areaService.traerAreas().subscribe((areas) => {
      this.areas = areas;
    });
  }


  getJornadas() {
    this._jornadaService.traerJornada().subscribe((jornadas) => {
      this.jornadas = jornadas;
    });
  }

  getUsuarios() {
    this._usuarioService.traerUsuarios().subscribe((usuario) => {
      this.usuarios = usuario;
    });
  }

  getGrupoById(event: number) {
    this._gruposService.traerGrupo(event).subscribe((grupo)=>{
      this.reset();
      this.grupo = grupo;
      this.showCalendar = true;
    });
  }
  getByIdInfra(event: number) {
    this._gruposService.traerGrupoByIdInfra(event).subscribe((grupos)=>{
      this.reset();
      this.grupos = grupos;
      this.showCalendar = true;
    });
  }
  getGruposJornadaByIdInfra(event: number) {
    const infra = this.infraestructuras.find((infra) => infra.id === event);
    if (infra) {
      const grupos = this.grupos.filter(
        (grupo) => grupo.horario_infraestructura.idInfraestructura === infra.id
      );
      if (grupos) {
        let gruposJornada: AsignacionJornadaGrupoModel[] = [];
        grupos.forEach((grupo) => {
          gruposJornada = gruposJornada.concat(
            this.gruposJornada.filter(
              (grupoJornada) => grupoJornada.idGrupo == grupo.id
            )
          );
        });
        if (gruposJornada) {
          this.gruposJornada = gruposJornada;
        }
      }
    } else {
      this.getGruposJornada();
    }
    this.showCalendar = true;
  }

  createCalendario() {
    this.sede = null;
    this.showFormSede = true;
  }
  createCalendario2() {
    this.grupo = null;
    this.showModalGrupo = true;
  }

  createCalendario3() {
    this.programa = null;
    this.showModalPrograma = true;
  }
  createCalendario4() {
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
    if (programa.id) {
      this._programaService
        .actualizarProgramas(programa)
        .subscribe((programa) => {
          this.getPrograma();
          this.reset();
        });
    } else {
      this._programaService.crearProgramas(programa).subscribe((programa) => {
        this.getPrograma();
        this.reset();
      });
    }
  }

  guardarJornada(event: JornadaModel) {
    this._jornadaService.crearJornada(event).subscribe((jornada) => {
      this.getJornadas();
      this.reset();
    });
  }

  guardarInfraestructura(event: InfraestructuraModel) {
    if (event.id) {
      this._infraestructuraService
        .actualizarInfraestructura(event)
        .subscribe(() => {
          this.getInfraestructuras();
          this.reset();
        });
    } else {
      this._infraestructuraService
        .guardarInfraestructura(event)
        .subscribe(() => {
          this.getInfraestructuras();
          this.reset();
        });
    }
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
