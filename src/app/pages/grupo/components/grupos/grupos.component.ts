import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { TipoGrupoModel } from "@models/tipogrupo.model";
import { GrupoModel } from "@models/grupo.model";
import { TipoGrupoService } from "@services/tipo-grupo.service";
import { ProgramaService } from "@services/programa.service";
import { JornadaService } from "@services/jornada.service";
import { InfraestructuraService } from "@services/infraestructura.service";
import { UsuarioService } from "@services/usuario.service";
import { UINotificationService } from "@services/uinotification.service";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ProgramaModel } from "@models/programa.model";
import { AsignacionJornadaGrupoModel } from "@models/asignacion-jornada-grupo.model";
import { TipoFormacionModel } from "@models/tipo-formacion.model";
import { InfraestructuraModel } from "@models/infraestructura.model";
import { UsuarioModel } from "@models/usuario.model";
import { NivelFormacionModel } from "@models/nivel-formacion.model";
import { TipoOfertaModel } from "@models/tipo-oferta.model";
import { EstadoGrupoModel } from "@models/estado-grupo.model";
import { NivelFormacionService } from "@services/nivel-formacion.service";
import { TipoFormacionService } from "@services/tipo-formacion.service";
import { EstadoGrupoService } from "@services/estado-grupo.service";
import { TipoOfertaService } from "@services/tipo-oferta.service";
import { JornadaModel } from "@models/jornada.model";
import { AsignacionJornadaGrupoService } from "@services/asignacion-jornada-grupo.service";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.scss"],
  providers: [DatePipe],
})
export class GruposComponent implements OnInit {
  @ViewChild("fechaInicialInput", { static: false })
  fechaInicialInput: ElementRef;
  @ViewChild("fechaFinalInput", { static: false }) fechaFinalInput: ElementRef;

  @ViewChild("jornadaSelect", { static: false })
  select: ElementRef<HTMLSelectElement>;

  @Output() store: EventEmitter<GrupoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  jornadaGrupos: AsignacionJornadaGrupoModel[] = [];
  jornada: JornadaModel[] = [];

  public showModalTipoGrupo = false;
  tipoGrupo: TipoGrupoModel = null;
  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() lideres: UsuarioModel[] = [];
  @Input() programas: ProgramaModel[] = [];
  @Input() infraestructuras: InfraestructuraModel[] = [];
  @Input() niveles: NivelFormacionModel[] = [];
  @Input() tipoFormaciones: TipoFormacionModel[] = [];
  @Input() estados: EstadoGrupoModel[] = [];
  @Input() tipoOfertas: TipoOfertaModel[] = [];
  @Input() jornadas: JornadaModel[] = [];

  @Input() grupo: GrupoModel;
  
  tipoGrupoForm: FormGroup;
  formGrupo: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder, // construccion de form controles
    private datePipe: DatePipe, //Fecha
    private cdr: ChangeDetectorRef,
    private _tipoGrupoService: TipoGrupoService, //Servicio TipoGrupo
    private _liderService: UsuarioService,
    private _programaService: ProgramaService,
    private _infraestructuraService: InfraestructuraService,
    private _nivelFormacionService: NivelFormacionService,
    private _tipoFormacionService: TipoFormacionService,
    private _estadoService: EstadoGrupoService,
    private _tipoOfertaService: TipoOfertaService,
    private _jornadasService: JornadaService,
    private _uiNotificationService: UINotificationService, //nofitificacion
    private _modalService: NgbModal, //Modal
    //Renderizar vista
    private _grupoJornadaService: AsignacionJornadaGrupoService
  ) {
    this.grupo = {
      id: null,
      nombre: "",
      fechaInicial: null,
      fechaFinal: null,
      observacion: "",
      idTipoGrupo: null,
      tipo_grupo: null,

      idPrograma: null,
      programa: null,

      idLider: null,
      lider: null,

      idInfraestructura: null,
      infraestructura: null,

      idNivel: null,
      nivel_formacion: null,

      idTipoFormacion: null,
      tipo_formacion: null,

      idEstado: null,
      estado_grupo: null,

      idTipoOferta: null,
      tipo_oferta: null,

      grupos_jornada: ([] = []),
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerTipoGrupos();
    this.traerProgramas();
    this.traerNivelesFormacion();
    this.traerInfraestructuras();
    this.traerTipoFormaciones();
    this.traerLideres();
    this.traerEstados();
    this.traerTipoOfertas();
    this.traerJornadas();
    this.setGrupo();
    this.traercheckedJornadas();
  }

  guardarTipoGrupo(tipoGrupo: TipoGrupoModel) {
    this._tipoGrupoService.crearTipoGrupo(tipoGrupo).subscribe((tipo) => {
      this.tipoGrupos.push(tipo);
      this._uiNotificationService.success(
        "Tipo de grupo agregado",
        "Tipo grupo"
      );
      this.reset();
    });
  }

  agregar() {
    this.showModalTipoGrupo = true;
    this.create.emit();
  }

  actualizarVista() {
    // Llamando a markForCheck() o detectChanges() para forzar una actualización del renderizado
    this.cdr.markForCheck(); // O this.cdr.detectChanges();
  }

  traerTipoGrupos() {
    this._tipoGrupoService.traerTipoGrupos().subscribe(
      (tipoGrupo: TipoGrupoModel[]) => {
        this.tipoGrupos = tipoGrupo;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerLideres() {
    this._liderService.traerUsuarios().subscribe(
      (lider: UsuarioModel[]) => {
        this.lideres = lider;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerProgramas() {
    this._programaService.traerProgramas().subscribe(
      (programa: ProgramaModel[]) => {
        this.programas = programa;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerInfraestructuras() {
    this._infraestructuraService.traerInfraestructuras().subscribe(
      (infraestructura: InfraestructuraModel[]) => {
        this.infraestructuras = infraestructura;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerNivelesFormacion() {
    this._nivelFormacionService.traerNivelesFormacion().subscribe(
      (niveles: NivelFormacionModel[]) => {
        this.niveles = niveles;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerTipoFormaciones() {
    this._tipoFormacionService.traerTipoFormaciones().subscribe(
      (tiposF: TipoFormacionModel[]) => {
        this.tipoFormaciones = tiposF;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerEstados() {
    this._estadoService.traerEstadoGrupos().subscribe(
      (estado: EstadoGrupoModel[]) => {
        this.estados = estado;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerTipoOfertas() {
    this._tipoOfertaService.traerTipoOfertas().subscribe(
      (tipoOferta: TipoOfertaModel[]) => {
        this.tipoOfertas = tipoOferta;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerJornadas() {
    this._jornadasService.traerJornada().subscribe(
      (jorn: JornadaModel[]) => {
        this.jornadas = jorn;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  get nombreField() {
    return this.formGrupo.get("nombre");
  }

  get fechaInicialField() {
    return this.formGrupo.get("fechaInicial");
  }

  get fechaFinalField() {
    return this.formGrupo.get("fechaFinal");
  }

  get observacion() {
    return this.formGrupo.get("observacion");
  }

  get idTipoGrupo() {
    return this.formGrupo.get("idTipoGrupo");
  }

  get liderField() {
    return this.formGrupo.get("idLider");
  }

  get programaField() {
    return this.formGrupo.get("idPrograma");
  }

  get infraestructuraField() {
    return this.formGrupo.get("idInfraestructura");
  }

  get nivelFormacionField() {
    return this.formGrupo.get("idNivel");
  }

  get tipoFormacionField() {
    return this.formGrupo.get("idTipoFormacion");
  }

  get tipoOfertaField() {
    return this.formGrupo.get("idTipoOferta");
  }

  get jornadaField() {
    return this.formGrupo.get("grupos_jornada");
  }

  setGrupo() {
    if (this.grupo) {
      this.formGrupo.patchValue({
        nombre: this.grupo.nombre,
        fechaInicial: this.grupo.fechaInicial,
        fechaFinal: this.grupo.fechaFinal,
        observacion: this.grupo.observacion,

        idTipoGrupo: this.grupo.idTipoGrupo,
        tipogrupo: this.grupo.tipo_grupo,

        idLider: this.grupo.idLider,
        lider: this.grupo.lider,

        idPrograma: this.grupo.idPrograma,
        programa: this.grupo.programa,

        idInfraestructura: this.grupo.idInfraestructura,
        infraestructura: this.grupo.infraestructura,

        idNivel: this.grupo.idNivel,
        nivel: this.grupo.nivel_formacion,

        idTipoFormacion: this.grupo.idTipoFormacion,
        tipoFormacion: this.grupo.tipo_formacion,

        idEstado: this.grupo.idEstado,
        estado: this.grupo.estado_grupo,

        idTipoOferta: this.grupo.idTipoOferta,
        tipoOferta: this.grupo.tipo_oferta,
      });
    }
  }

  private buildForm() {
    this.formGrupo = this.formBuilder.group({
      id: [0],
      nombre: ["", [Validators.required]],
      fechaInicial: ["", [Validators.required]],
      fechaFinal: ["", [Validators.required]],
      observacion: ["", [Validators.required]],

      idTipoGrupo: ["", [Validators.required]],

      idLider: ["", [Validators.required]],

      idPrograma: ["", [Validators.required]],

      idInfraestructura: ["", [Validators.required]],

      idNivel: ["", [Validators.required]],

      idTipoFormacion: ["", [Validators.required]],

      idEstado: ["", [Validators.required]],

      idTipoOferta: ["", [Validators.required]],

      dataJornada: this.formBuilder.array([]),

      grupos_jornada: ["", [Validators.required]],
    });

    this.formGrupo.valueChanges.pipe(debounceTime(350)).subscribe((data) => {});
  }

  guardarGrupo() {
    if (this.validarFechas()) {
      this.store.emit(this.getGrupo());
    }
  }

  closeModal() {
    this.cancel.emit();
  }

  public getControl(name: string) {
    return this.formGrupo.controls[name];
  }

  getGrupo(): GrupoModel {
    /*const grupoJornadas: number[] = Array.from(this.select.nativeElement.selectedOptions)
    .map((option: HTMLOptionElement) => {
      return parseInt(option.value);
    });*/
    const grupoJornadas: AsignacionJornadaGrupoModel[] = this.jornadas
      .filter((j) => j["checked"])
      .map((j) => {
        return {
          idJornada: j.id,
        };
      });

    return {
      id: this.grupo?.id,
      nombre: this.getControl("nombre").value,
      fechaInicial: this.getControl("fechaInicial").value,
      fechaFinal: this.getControl("fechaFinal").value,
      observacion: this.getControl("observacion").value,
      idTipoGrupo: this.getControl("idTipoGrupo").value,
      idLider: this.getControl("idLider").value,
      idPrograma: this.getControl("idPrograma").value,
      idInfraestructura: this.getControl("idInfraestructura").value,
      idNivel: this.getControl("idNivel").value,
      idTipoFormacion: this.getControl("idTipoFormacion").value,
      idEstado: this.getControl("idEstado").value,
      idTipoOferta: this.getControl("idTipoOferta").value,

      grupos_jornada: grupoJornadas,
      //grupos_jornada: grupoJornadas.map((idJornada) => ({ idJornada })),
    };
  }

  obtenerFechaInicialValue(): Date {
    const fechaInicialValue = this.fechaInicialInput.nativeElement.value;
    const fechaInicial = new Date(fechaInicialValue);
    return fechaInicial;
  }

  obtenerFechaFinalValue(): Date {
    const fechaFinalValue = this.fechaFinalInput.nativeElement.value;
    const fechaFinal = new Date(fechaFinalValue);
    return fechaFinal;
  }

  validarFechas(): boolean {
    const fechaInicial = this.obtenerFechaInicialValue();
    const fechaFinal = this.obtenerFechaFinalValue();

    if (fechaFinal > fechaInicial) {
      return true;
    } else {
      this._uiNotificationService.error(
        "La fecha final no puede ser menor a fecha inicial 😊",
        "Fechas"
      );
      return false;
    }
  }

  reset() {
    this.tipoGrupo = null;
    this.showModalTipoGrupo = false;
  }

  //jornadas

  public jornadasChecked: any[];
  allJornadas = false;

  changeJornada(checked: boolean, index: number) {
    this.jornadas[index]["checked"] = checked;
    this.allJornadas = this.totalJornadasSeleccionadas === 3;
  }

  get totalJornadasSeleccionadas() {
    return this.jornadas.filter((j) => j["checked"]).length;
  }
  changeAllJornadas(allJor: boolean) {
    this.allJornadas = allJor;
    if (allJor) {
      this.jornadas.map((jor) => {
        jor["checked"] = true;
        return jor;
      });
    } else {
      this.jornadas.map((jor) => {
        jor["checked"] = false;
        return jor;
      });
    }
  }

  traercheckedJornadas() {
    this.jornadasChecked = [];
    this._grupoJornadaService.getGrupoJornadaByGrupo(this.grupo.id).subscribe(
      (savedData: any) => {
        console.log(savedData);
        if (savedData && savedData.length > 0) {
          this.jornadasChecked = savedData;
          this.jornadas = this.jornadas.map((jorSe) => {
            jorSe.checked =
              this.jornadasChecked.findIndex(
                (j) => j.idJornada === jorSe.id
              ) !== -1;
            return jorSe;
          });
        } else {
          this.jornadas.forEach((jorSe) => {
            jorSe.checked = false;
          });
        }
      },
      (error) => {
        console.log("There was an error while retrieving data !!!", error);
      }
    );
  }
}
