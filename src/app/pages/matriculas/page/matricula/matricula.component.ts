import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  UntypedFormBuilder,
  UntypedFormGroup,
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { MatriculaService } from "@services/matricula.service";
import { PersonaModel } from "@models/persona.model";
import { UINotificationService } from "@services/uinotification.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import { ProgramaModel } from "@models/programa.model";
import { ProgramaService } from "@services/programa.service";
import { TipoGrupoModel } from "@models/tipogrupo.model";
import { MatriculaModel } from "@models/matricula.model";
import { TipoGrupoService } from "@services/tipo-grupo.service";
import { delay, filter, catchError } from "rxjs/operators";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";

import { TipoProgramaModel } from "@models/tipo-programa.model";
import { TipoProgramaService } from "@services/tipo-programa.service";
import { ProyectoFormativoService } from "@services/proyecto-formativo.service";
import { ProyectoFormativoModel } from "@models/proyecto-formativo.model ";
import { PersonaService } from "@services/persona.service";
import { TipoIdentificacionModel } from "@models/tipo-identificacion.model";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-matricula",
  templateUrl: "./matricula.component.html",
  styleUrls: ["./matricula.component.scss"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class MatriculaComponent implements OnInit {
  @ViewChild(MatStepper) stepper: MatStepper;

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() programas: ProgramaModel[] = [];
  @Input() proyectoFormativos: ProyectoFormativoModel[] = [];

  @Input() tipoIdent: TipoIdentificacionModel[] = [];

  personForm: FormGroup;
  matriculaForm: FormGroup;
  documentoForm: FormGroup;

  stepperForm!: FormGroup;

  validacionExistencia: boolean = false;
  identificacionForm: FormGroup;
  private identificacionSubject: Subject<number> = new Subject<number>();
  private numeroFichaSubject: Subject<number> = new Subject<number>();

  isLinear = true;

  formMatricula: UntypedFormGroup;

  dataFicha: any;
  mostrar: boolean = false;

  numeroFicha: number;
  mostrarFormulario: boolean = false;

  fichaNoEncontrada: boolean = false;


  constructor(
    private _formBuilder: FormBuilder,
    private _matriculaService: MatriculaService,
    private _uiNotificationService: UINotificationService,
    private _programaService: ProgramaService,
    private _tipoGrupoService: TipoGrupoService,
    private _tipoIdentificacion: PersonaService,
    private dialog: MatDialog
  ) {
    this.personForm = this._formBuilder.group({
      identificacion: ["", Validators.required],
      nombre1: ["", Validators.required],
      nombre2: ["", Validators.required],
      apellido1: ["", Validators.required],
      apellido2: ["", Validators.required],
      fechaNac: ["", Validators.required],
      direccion: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      telefonoFijo: ["", Validators.required],
      celular: ["", Validators.required],
    });

    this.matriculaForm = this._formBuilder.group({
      idTipoGrupo: ["", Validators.required],
      idPrograma: ["", Validators.required],
      ficha: ["", Validators.required],
    });

    this.identificacionSubject
      .pipe(debounceTime(700))
      .subscribe((identificacion) => {
        this.personaByIdentificacion(identificacion);
      });

    this.numeroFichaSubject.pipe(debounceTime(700)).subscribe((numeroFicha) => {
      this.numeroFichaByGrupo(numeroFicha);
    });
  }

  ngOnInit(): void {
    this.traerTipoGrupos();
    this.traerProgramas();

    this.identificacionSubject
      .pipe(
        filter((identificacion) => identificacion >= 10000000000),
        debounceTime(700)
      )
      .subscribe((identificacion: number) => {
        this.personaByIdentificacion(identificacion);
      });

    this.numeroFichaSubject
      .pipe(
        filter((numeroFicha) => numeroFicha >= 10000000000),
        debounceTime(700)
      )
      .subscribe((numeroFicha: number) => {
        this.numeroFichaByGrupo(numeroFicha);
      });
  }

  tipoIdentificacion() {
    this._tipoIdentificacion.traerTiposId().subscribe(
      (tIdentificacion: TipoIdentificacionModel[]) => {
        this.tipoIdent = tIdentificacion;
        console.log(this.tipoIdent);
      },
      (error) => {
        // this._uiNotificationService.error('Error al obtener los tipos de identificación', 'Tipo identificación');
      }
    );
  }

  onIdentificacionInput(identificacion: number) {
    if (identificacion) {
      this.identificacionSubject.next(identificacion);
    } else {
      this.validacionExistencia = false;
      this.personForm.reset();
    }
  }

  onNumeroFichaInput(numeroFicha: number) {
    if (numeroFicha) {
      this.numeroFichaSubject.next(numeroFicha);
    } else {
      this.validacionExistencia = false;
      this.personForm.reset();
    }
  }

  personaByIdentificacion(identificacion: number) {
    this._matriculaService.personByIdentificacion(identificacion).subscribe(
      (response: any) => {
        if (response.message === "Se encontró la persona") {
          const persona = response.person;
          this.validacionExistencia = true;
          // this.personForm.get('identificacion').setValue(persona.identificacion);
          this.personForm.get("nombre1").setValue(persona.nombre1);
          this.personForm.get("nombre2").setValue(persona.nombre2);
          this.personForm.get("apellido1").setValue(persona.apellido1);
          this.personForm.get("apellido2").setValue(persona.apellido2);
          this.personForm.get("fechaNac").setValue(persona.fechaNac);
          this.personForm.get("direccion").setValue(persona.direccion);
          this.personForm.get("email").setValue(persona.email);
          this.personForm.get("telefonoFijo").setValue(persona.telefonoFijo);
          this.personForm.get("celular").setValue(persona.celular);
        } else {
          this.validacionExistencia = false;
        }
      },
      (error) => {
        this._uiNotificationService.error(
          "Ocurrió un error al obtener la persona"
        );
        console.log(error);
      }
    );
  }

  numeroFichaByGrupo(numeroFicha: number) {
    this._matriculaService.numeroFichaByGrupo(numeroFicha).subscribe(
      (data) => {
        console.log(data);
        this.dataFicha = data;
        if (!this.dataFicha) {
          this.fichaNoEncontrada = true;
        } else {
          this.fichaNoEncontrada = false;
        }
      },
      (error) => {
        console.log(error);
        this.fichaNoEncontrada = true;
      }
    );
  }

  mostrarDatos(): boolean {
    return !!this.dataFicha;
  }

  traerProgramas() {
    this._programaService.traerProgramas().subscribe(
      (programas: ProgramaModel[]) => {
        this.programas = programas;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
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
  // validar cada campo
  validarCamposPersona() {
    Object.keys(this.personForm.controls).forEach((field) => {
      const control = this.personForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  validarCamposMatricula() {
    Object.keys(this.matriculaForm.controls).forEach((field) => {
      const control = this.personForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  mostrarModal(textTitle: string) {
    return Swal.fire({
      title: textTitle,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario hizo clic en "Aceptar" en el modal
        return true;
      } else {
        // El usuario hizo clic en "Cancelar" o cerró el modal
        return false;
      }
    });
  }

  seguirAceptar() {
    this.mostrarModal("¿Estás seguro de aceptar esta ficha?").then(
      (confirmado) => {
        if (confirmado) {
          this.stepper.next();
        } else if (this.matriculaForm.invalid) {
          alert("Por favor, llena todos los cambios");
        }
      }
    );
  }


  enviarFormularios()
  {
    const datosFormulario1 = this.personForm.value;
    const datosFormulario2 = this.formMatricula.value;
    // const datosFormulario3 = this.form3.value;

    // this._matriculaService.crearMatricula(this.personForm: datosFormulario1, this.matriculaForm: datosFormulario2).subscribe(
    //   (response) => {
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }



}
