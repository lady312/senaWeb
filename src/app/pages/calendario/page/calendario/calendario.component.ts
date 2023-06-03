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
  infraestructura: InfraestructuraModel = null;
  area: AreaModel = null;
  jornada: JornadaModel = null;

  jornadas: JornadaModel[] = [];

  calendarios: CalendarioModel[] = [];
  sedes: SedeModel[] = [];
  formTitle: string;
  ciudades: CiudadModel[] = [];
  departamentos: DepartamentoModel[] = [];
  grupos: GrupoModel[] = [];
  programas: ProgramaModel[] = [];
  infraestructuras: InfraestructuraModel[] = [];
  areas: AreaModel[] = [];
  infreaestructuras: InfraestructuraModel[] = [];
  usuarios: UsuarioModel[] = [];
  gruposJornada: AsignacionJornadaGrupoModel[] = [];

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
    private _usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getCiudades();
    this.getDepartamento();
    this.getSedes();
    this.getGrupo();
    this.getPrograma();
    this.getInfraestructuras();
    this.getCiudades();
    this.getAreas();
    this.getJornadas();
    this.getGruposJornada();
    this.getUsuarios();
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
  getGrupo() {
    this._gruposService.traerGrupos().subscribe((grupos) => {
      this.grupos = grupos;
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
    this._infraestructuraService
      .traerInfraestructuras()
      .subscribe((infraestructuras) => {
        this.infraestructuras = infraestructuras;
      });
  }

  getAreas() {
    this._areaService.traerAreas().subscribe((areas) => {
      this.areas = areas;
    });
  }

  getSedesByCiudad(idCiudad: number) {
    this._sedeService.sedesByCiudad(idCiudad).subscribe((sedes) => {
      if (sedes) {
        this.sedes = sedes;
      } else {
        this.sedes = [];
      }
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

  getGruposJornadaByIdGrupo(event: number) {
    const grupo = this.grupos.find((grupo) => grupo.id == event);
    if (grupo) {
      this.gruposJornada = this.gruposJornada.filter(
        (grupoJornada) => grupoJornada.idGrupo == grupo.id
      );
    } else {
      this.getGruposJornada();
    }
  }
  getByIdSede(event: number) {
    const sede = this.sedes.find((sede) => sede.id == event);

    if (sede) {
      this._infraestructuraService.infrBySede(sede.id).subscribe((infrs) => {
        this.infraestructuras = infrs;
      });
    } else {
      this.getInfraestructuras();
    }
  }
  getGruposJornadaByIdInfra(event: number) {
    const infra = this.infraestructuras.find((infra) => infra.id == event);
    if (infra) {
      const grupos = this.grupos.filter(
        (grupo) => grupo.idInfraestructura == infra.id
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
    this.infraestructura = null;
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
        this.getGrupo();
        this.reset();
      });
    } else {
      this._gruposService.crearGrupo(grupo).subscribe((gr) => {
        this.getGrupo();
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
    this.infraestructura = null;
    this.jornada = null;
    this.showModalJornada = false;
  }
}
