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

  @Input() usuario: UsuarioModel;//actualizar

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
          this._uiNotificationService.success(
            "Ya te encuentras registrado!!!"
          );
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
          this.validacionExistencia = false;
        }
      },
      (error) => {
        this._uiNotificationService.error(
          "Ocurrió un error al obtener la persona"
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


  guardarPersona() {
    if (this.personForm.valid) {
      // Aquí puedes escribir la lógica para guardar los datos de la persona
      this.crearUsuario();
      console.log('Datos guardados correctamente');
    } else {
      this.validarCamposPersona(); // Marcas los campos como tocados para mostrar los mensajes de error
      console.log('Formulario inválido. No se pueden guardar los datos.');
    }
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

  // seguirAceptar() {
  //   this.mostrarModal('¿Estás seguro de aceptar esta ficha?').then((confirmado) => {
  //     if (confirmado) {
  //       this.stepper.next();
  //     }
  //     else if(this.matriculaForm.invalid)
  //     {
  //       alert('Por favor, llena todos los cambios');
  //     }
  //   });
  // }

  getUsuarios() {
    this._personaService.traerUsuarios()
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        // this.rolesByCompany();
        console.log('user', this.usuarios)
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }


  guardarUsuarios() {
    if (this.personForm.valid) {
      const usuario: UsuarioModel = this.getUsuario();
      this._personaService.crearUsuario(usuario).subscribe(() => {
        // Realiza las acciones adicionales necesarias después de guardar el usuario
        // Por ejemplo, puedes reiniciar el formulario o navegar a otra página
        // this.personForm.reset();
      });
    } else {
      this.validarCamposPersona(); // Marcas los campos como tocados para mostrar los mensajes de error
      console.log('Formulario inválido. No se pueden guardar los datos.');
    }
  }



  private getControl(name: string) {
    return this.personForm.controls[name];
  }


  getUsuario() {
    return {
      id: this.usuario?.id,
      identificacion: this.getControl('identificacion').value,
      email: this.getControl('email').value,
      contrasena: 'contraseña',
      nombre1: this.getControl('nombre1').value,
      nombre2: this.getControl('nombre2').value,
      apellido1: this.getControl('apellido1').value,
      apellido2: this.getControl('apellido2').value,
      // fechaNac: this.getControl('fechaNac').value['formatted'],
      fechaNac: '2012/12/12',
      celular: this.getControl('celular').value,
      direccion: 'Sin registro',
      telefonoFijo: 'Sin registro',
      perfil: 'Sin registro',
      sexo: '-',
      rh: '-',
      idTipoIdentificacion: 1,
      idCiudad: 1,
      idCiudadNac: 1,
      idCiudadUbicacion: 1,
      rutaFoto: '/default/user.svg',

    }
  }


  get emailField() {
    return this.personForm.get('email');
  }

  // get contrasenaField() {
  //   return this.formMatricula.get('contrasena');
  // }
  get nombre1Field() {
    return this.personForm.get('nombre1');
  }
  get nombre2Field() {
    return this.personForm.get('nombre2');
  }
  get apellido1Field() {
    return this.personForm.get('apellido1');
  }
  get apellido2Field() {
    return this.personForm.get('apellido2');
  }
  get fechaNacField() {
    return this.personForm.get('fechaNac');
  }

  get celularField() {
    return this.personForm.get('celular');
  }

  getPersonaData() {
    return {
      idtipoIdentificacion: '1',
      identificacion: this.personForm.get('identificacion').value.toString(),
      nombre1: this.personForm.get('nombre1').value.toUpperCase(),
      nombre2: this.personForm.get('nombre2').value.toUpperCase(),
      apellido1: this.personForm.get('apellido1').value.toUpperCase(),
      apellido2: this.personForm.get('apellido2').value.toUpperCase(),
      direccion: this.personForm.get('direccion').value.toUpperCase(),
      idciudadNac: '1',
      idciudad: '1',
      telefonoFijo: this.personForm.get('telefonoFijo').value,
      celular: this.personForm.get('celular').value,
      idciudadUbicacion: '1',
      email: this.personForm.get('email').value,
      fechaNac: this.personForm.get('fechaNac').value['formatted']
    };
  }


  // crearUsuario() {
  //   if (this.personForm.valid) {
  //     const personaFormData = new FormData();
  //     personaFormData.append('idtipoIdentificacion', '1');
  //     personaFormData.append('identificacion', this.personForm.get('identificacion').value.toString());
  //     personaFormData.append('nombre1', this.personForm.get('nombre1').value.toUpperCase());
  //     personaFormData.append('nombre2', this.personForm.get('nombre2').value.toUpperCase());
  //     personaFormData.append('apellido1', this.personForm.get('apellido1').value.toUpperCase());
  //     personaFormData.append('apellido2', this.personForm.get('apellido2').value.toUpperCase());
  //     personaFormData.append('direccion', this.personForm.get('direccion').value.toUpperCase());
  //     personaFormData.append('idciudadNac', '1');
  //     personaFormData.append('idciudad', '1');
  //     personaFormData.append('telefonoFijo', this.personForm.get('telefonoFijo').value);
  //     personaFormData.append('celular', this.personForm.get('celular').value);
  //     personaFormData.append('idciudadUbicacion', '1');
  //     personaFormData.append('email', this.personForm.get('email').value);
  //     personaFormData.append('fechaNac', this.personForm.get('fechaNac').value['formatted']);

  //     personaFormData.forEach((value, key) => {
  //       console.log(key + ': ' + value);
  //     });

  //     this._personaService.crearPersona(personaFormData).subscribe(
  //       (response: any) => {
  //         // Maneja la respuesta exitosa del servicio si es necesario
  //         console.log("Se enviaron los hptasss datosssss")
  //         console.log(response);
  //       },
  //       (error) => {
  //         // Maneja el error del servicio si ocurre
  //         console.log(error);
  //       }
  //     );
  //   } else {
  //     // El formulario no es válido, realiza las acciones necesarias
  //     console.log('El formulario no es válido');
  //   }
  // }


  crearUsuario() {
    if (this.personForm.valid) {
      const personaData = this.getPersonaData();
      const usuarioData = this.getUsuario();

      // Realiza las acciones necesarias para guardar la persona y el usuario
      // ...

      console.log(personaData);
      console.log(usuarioData);
    } else {
      console.log('El formulario no es válido');
    }
  }





}
