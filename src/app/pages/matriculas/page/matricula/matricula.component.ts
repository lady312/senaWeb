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
import { filter } from "rxjs/operators";
import Swal from "sweetalert2";
import { MatDialog } from "@angular/material/dialog";

import { ProyectoFormativoModel } from "@models/proyecto-formativo.model ";
import { PersonaService } from "@services/persona.service";
import { TipoIdentificacionModel } from "@models/tipo-identificacion.model";
import { MatStepper } from "@angular/material/stepper";
import { UsuarioService } from "@services/usuario.service";
import { UsuarioModel } from "@models/usuario.model";

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

  usuarios: UsuarioModel[] = [];

  @Input() usuario: UsuarioModel; //actualizar

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
  fichaIncorrecta: boolean = false;

  detectarPersonaEnElSistema: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _matriculaService: MatriculaService,
    private _uiNotificationService: UINotificationService,
    private _programaService: ProgramaService,
    private _tipoGrupoService: TipoGrupoService,
    private _tipoIdentificacion: PersonaService,
    private _personaService: UsuarioService,
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
          this._uiNotificationService.success("Ya te encuentras registrado!!!");
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
          this.resetPersonForm();
        }
      },
      (error) => {
        this.detectarPersonaEnElSistema = true;
        this._uiNotificationService.error(
          "No se encontro la persona en el sistema"
        );
        console.log(error);
        this.resetPersonForm();
      }
    );
  }

  resetPersonForm() {
    this.personForm.get("nombre1").setValue(null);
    this.personForm.get("nombre2").setValue(null);
    this.personForm.get("apellido1").setValue(null);
    this.personForm.get("apellido2").setValue(null);
    this.personForm.get("fechaNac").setValue(null);
    this.personForm.get("direccion").setValue(null);
    this.personForm.get("email").setValue(null);
    this.personForm.get("telefonoFijo").setValue(null);
    this.personForm.get("celular").setValue(null);
  }

  numeroFichaByGrupo(numeroFicha: number) {
    this._matriculaService.numeroFichaByGrupo(numeroFicha).subscribe(
      (data) => {
        console.log(data);
        this.dataFicha = data;
        if (!this.dataFicha) {
          this.fichaNoEncontrada = true;
          // alert('La ficha no se encuentra');
        } else {
          this.fichaNoEncontrada = false;
          // Continuar con el resto del código si la ficha se encuentra
        }
      },
      (error) => {
        console.log(error);
        this.fichaNoEncontrada = true;
        // alert('Error al buscar la ficha');
      }
    );
  }

  seguirAceptar(): void {
    this.mostrarModal("¿Estás seguro de aceptar esta ficha?").then(
      (confirmado) => {
        if (this.fichaNoEncontrada) {
          this.mostrarModal("La ficha es incorrecta");
        } else {
          this.stepper.next();
        }
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
        return true;
      } else {
        return false;
      }
    });
  }

  //Funcion para guardar el usuario
  // guardarUsuario() {
  //   if (this.personForm.valid) {
  //     const usuario: UsuarioModel = this.getUsuario();

  //     if (this.detectarPersonaEnElSistema) {
  //       this._personaService.crearUsuario(usuario).subscribe(
  //         (response) => {
  //           console.log(response);

  //           const personaId = response.id;

  //           this._uiNotificationService.success(
  //             "La persona se creo correctamente y se asigno a la matricula"
  //           );

  //           this._matriculaService.asignarPersona(personaId).subscribe(
  //             (response) => {
  //               console.log(response);
  //             },
  //             (error) => {
  //               console.log("Error al asignar persona a la matrícula");
  //               console.log(error);
  //             }
  //           );
  //         },
  //         (error) => {
  //           this._uiNotificationService.error(
  //             "Ups hubo un error, refresca la página o intentalo más tarde"
  //           );
  //           console.log(error);
  //           this.detectarPersonaEnElSistema = false;
  //         }
  //       );
  //     } else {
  //       console.log(
  //         "Asignar id a la foranea de la matricula entre Matricula y persona"
  //       );
  //     }
  //   } else {
  //     this.validarCamposPersona();
  //     console.log("Formulario inválido. No se pueden guardar los datos.");
  //   }
  // }

  guardarUsuario() {
    if (this.personForm.valid) {
      const usuario: UsuarioModel = this.getUsuario();

      if (this.detectarPersonaEnElSistema) {
        this._personaService.crearUsuario(usuario).subscribe(
          (response) => {
            console.log(response);

            if (response && response.id) {
              const personaId = response.id;
              this.asignarPersonaAMatricula(personaId);
            } else {
              this.mostrarErrorCreacionPersona();
            }
          },
          (error) => {
            this.mostrarErrorCreacionPersona();
            console.log(error);
            this.detectarPersonaEnElSistema = false;
          }
        );
      } else {
        console.log(
          "Asignar ID a la foranea de la matricula entre Matricula y persona"
        );
      }
    } else {
      this.validarCamposPersona();
      console.log("Formulario inválido. No se pueden guardar los datos.");
    }
  }

  private asignarPersonaAMatricula(personaId: number) {
    this._matriculaService.asignarPersona(personaId).subscribe(
      (response) => {
        console.log(response);
        this._uiNotificationService.success(
          "Se asignó correctamente la persona a la matrícula"
        );
      },
      (error) => {
        console.log("Error al asignar persona a la matrícula");
        console.log(error);
        this._uiNotificationService.error(
          "Hubo un error al asignar la persona a la matrícula"
        );
      }
    );
  }

  private mostrarErrorCreacionPersona() {
    this._uiNotificationService.error(
      "No se pudo crear la persona. Por favor, inténtalo nuevamente."
    );
  }


  private getControl(name: string) {
    return this.personForm.controls[name];
  }

  getUsuario() {
    return {
      id: this.usuario?.id,
      identificacion: this.getControl("identificacion").value,
      email: this.getControl("email").value,
      contrasena: "contraseña",
      nombre1: this.getControl("nombre1").value,
      nombre2: this.getControl("nombre2").value,
      apellido1: this.getControl("apellido1").value,
      apellido2: this.getControl("apellido2").value,
      // fechaNac: this.getControl('fechaNac').value['formatted'],
      fechaNac: "2012/12/12",
      celular: this.getControl("celular").value,
      direccion: "Sin registro",
      telefonoFijo: "Sin registro",
      perfil: "Sin registro",
      sexo: "-",
      rh: "-",
      idTipoIdentificacion: 1,
      idCiudad: 1,
      idCiudadNac: 1,
      idCiudadUbicacion: 1,
      rutaFoto: "/default/user.svg",
    };
  }

  get emailField() {
    return this.personForm.get("email");
  }

  get nombre1Field() {
    return this.personForm.get("nombre1");
  }

  get nombre2Field() {
    return this.personForm.get("nombre2");
  }

  get apellido1Field() {
    return this.personForm.get("apellido1");
  }

  get apellido2Field() {
    return this.personForm.get("apellido2");
  }

  get fechaNacField() {
    return this.personForm.get("fechaNac");
  }

  get celularField() {
    return this.personForm.get("celular");
  }
}
