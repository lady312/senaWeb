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
import { debounceTime } from "rxjs/operators";

import { DatePipe } from "@angular/common";
import { ProgramaModel } from "@models/programa.model";
import { AsignacionJornadaGrupoModel } from "@models/asignacion-jornada-grupo.model";
import { TipoFormacionModel } from "@models/tipo-formacion.model";
import { InfraestructuraModel } from "@models/infraestructura.model";
import { UsuarioModel } from "@models/usuario.model";
import { NivelFormacionModel } from "@models/nivel-formacion.model";
import { TipoOfertaModel } from "@models/tipo-oferta.model";
import { EstadoGrupoModel } from "@models/estado-grupo.model";
import { JornadaModel } from "@models/jornada.model";
import { UINotificationService } from "@services/uinotification.service";

@Component({
  selector: "app-grupos",
  templateUrl: "./grupos.component.html",
  styleUrls: ["./grupos.component.scss"],
  providers: [DatePipe],
})
export class GruposComponent implements OnInit {

  public jornadasChecked: any[];
  allJornadas = false;

  public infraestructura: any[];

  public showModalTipoGrupo = false;
  public showModalHorarioInfraestructura = false;

  tipoGrupo: TipoGrupoModel = null;

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() instructores: UsuarioModel[] = [];
  @Input() programas: ProgramaModel[] = [];
  @Input() infraestructuras: InfraestructuraModel[] = [];
  @Input() niveles: NivelFormacionModel[] = [];
  @Input() tipoFormaciones: TipoFormacionModel[] = [];
  @Input() estados: EstadoGrupoModel[] = [];
  @Input() tipoOfertas: TipoOfertaModel[] = [];
  @Input() jornadas: JornadaModel[] = [];

  @Input() title: string;
  @Input() grupo: GrupoModel = null;


  @Output() store = new EventEmitter<GrupoModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() create = new EventEmitter<void>();

  infrConHorarios: InfraestructuraModel[] = [];
  grupoConJornadas: JornadaModel[] = [];

  formGrupo: UntypedFormGroup;

  idTipoGrupo: number = 0;
  idLider: number = 0;
  idPrograma: number = 0;
  idNivel: number = 0;
  idTipoFormacion: number = 0;
  idEstado: number = 0;
  idTipoOferta: number = 0;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.setGrupo();

  }

  get nombreField() {
    return this.formGrupo.get('nombreGrupo');
  }

  get fechaInicialGrupo() {
    return this.formGrupo.get('fechaInicialGrupo');
  }

  get fechaFinalGrupo() {
    return this.formGrupo.get('fechaFinalGrupo')
  }


  agregar() {
    this.showModalTipoGrupo = true;
    this.create.emit();
  }

  agregarHorarioInfraestructura() {
    this.showModalHorarioInfraestructura = true;
    this.create.emit();
  }

  agregarHorarioInfraestructuraModel() {
    this.showModalHorarioInfraestructura = true;
    this.create.emit();
  }

  actualizarVista() {

  }

  setGrupo() {
    if (this.grupo) {
      this.formGrupo.patchValue({
        nombre: this.grupo.nombre,
        fechaInicialGrupo: this.grupo.fechaInicialGrupo,
        fechaFinalGrupo: this.grupo.fechaFinalGrupo,
        observacion: this.grupo.observacion,

        idTipoGrupo: this.grupo.idTipoGrupo,
        tipogrupo: this.grupo.tipo_grupo,

        idLider: this.grupo.idLider,
        lider: this.grupo.lider,

        idPrograma: this.grupo.idPrograma,
        programa: this.grupo.programa,

        idNivel: this.grupo.idNivel,
        nivel: this.grupo.nivel_formacion,

        idTipoFormacion: this.grupo.idTipoFormacion,
        tipoFormacion: this.grupo.tipo_formacion,

        idEstado: this.grupo.idEstado,
        estado: this.grupo.estado_grupo,

        idTipoOferta: this.grupo.idTipoOferta,
        tipoOferta: this.grupo.tipo_oferta,
      })
    }
  }

  private buildForm() {
    this.formGrupo = this.formBuilder.group({
      id: [0],
      nombre: ["", [Validators.required]],
      fechaInicialGrupo: ["", [Validators.required]],
      fechaFinalGrupo: ["", [Validators.required]],
      observacion: ["", [Validators.required]],

      idTipoGrupo: ["", [Validators.required]],

      idLider: ["", [Validators.required]],

      idPrograma: ["", [Validators.required]],

      idNivel: ["", [Validators.required]],

      idTipoFormacion: ["", [Validators.required]],

      idEstado: ["", [Validators.required]],

      idTipoOferta: ["", [Validators.required]],

      infraestructura: ["", [Validators.required]],

      grupos_jornada: ["", [Validators.required]],

      //dataJornada: this.formBuilder.array([]),

    });

    this.formGrupo.valueChanges.pipe(debounceTime(350)).subscribe((data) => { });

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

    let description = '';
    const grupoJornadas: AsignacionJornadaGrupoModel[] = this.jornadas
      .filter((j) => j["checked"])
      .map((j) => {
        description += j.nombreJornada + ' | ';
        return {
          idJornada: j.id,
        };
      });

    // const HorarioInfraestructurasGrupo: number[] = Array.from(this.infraestructuraSelect.nativeElement.selectedOptions)
    //   .map((option: HTMLOptionElement) => {
    //     return parseInt(option.value);
    //   });

    console.log(grupoJornadas);

    return {
      id: this.grupo?.id,
      nombre: this.getControl('nombre').value,
      fechaInicialGrupo: this.getControl('fechaInicialGrupo').value,
      fechaFinalGrupo: this.getControl('fechaFinalGrupo').value,
      observacion: this.getControl('observacion').value,
      idTipoGrupo: this.getControl('idTipoGrupo').value,
      idLider: this.getControl('idLider').value,
      idPrograma: this.getControl('idPrograma').value,
      idNivel: this.getControl('idNivel').value,
      idTipoFormacion: this.getControl('idTipoFormacion').value,
      idEstado: this.getControl('idEstado').value,
      idTipoOferta: this.getControl('idTipoOferta').value,

      // infraestructura: HorarioInfraestructurasGrupo.map((idInfraestructura) => ({ idInfraestructura })),
      //infraestructura: this.datosDelSegundoModal,

      //grupos_jornada: grupoJornadas,

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

  onChange(dia: AsignacionJornadaGrupoModel, isChecked: boolean, pos: number) {
    if (isChecked) {
      this.jornadaGrupos.push(dia);
    } else {
      this.jornadaGrupos.splice(pos, 1);
    }
  }

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


  reset() {
    this.tipoGrupo = null;
    this.showModalTipoGrupo = false;
  }

  resetHorarioInfraestructura() {
    this.horarioGrupoInfraestructura = null;
    this.showModalHorarioInfraestructura = false;
  }

}