import {
  Component,
  OnInit,
  Input,
  Output,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, UntypedFormBuilder, UntypedFormGroup, } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatriculaService } from '@services/matricula.service';
import { PersonaModel } from '@models/persona.model';
import { UINotificationService } from '@services/uinotification.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ProgramaModel } from '@models/programa.model';
import { ProgramaService } from '@services/programa.service';
import { TipoGrupoModel } from "@models/tipogrupo.model";
import { MatriculaModel } from "@models/matricula.model";
import { TipoGrupoService } from "@services/tipo-grupo.service";


@Component({

  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})


export class MatriculaComponent implements OnInit {


  @Input() tipoGrupos: TipoGrupoModel[] = [];

  programa: ProgramaModel;
  programas: ProgramaModel[] = [];
  personForm: FormGroup;
  activoForm: FormGroup;
  validacionExistencia: boolean = false;
  identificacionForm: FormGroup;
  private identificacionSubject: Subject<number> = new Subject<number>();

  isLinear: true;

  formMatricula: UntypedFormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _matriculaService: MatriculaService,
    private _uiNotificationService: UINotificationService,
    private _programaService: ProgramaService,
    private _tipoGrupoService: TipoGrupoService

  ) {
    this.personForm = this._formBuilder.group({
      identificacion: ['', Validators.required],
      nombre1: [''],
      nombre2: [''],
      apellido1: [''],
      apellido2: [''],
      fechaNacimiento: [''],
      direccion: [''],
      correo: [''],
      telefono: ['']
    });

    this.activoForm = this._formBuilder.group({

  idTipoGrupo   })

    this.identificacionSubject.pipe(debounceTime(1000)).subscribe((identificacion) => {
      this.personaByIdentificacion(identificacion);
    });

  }

  ngOnInit(): void {
    this.traerTipoGrupos();
    this.traerProgramas();
  }

  setFormValues(person: PersonaModel) {
    this.personForm.patchValue({
      nombre1: person.nombre1,
      nombre2: person.nombre2,
      apellido1: person.apellido1,
      apellido2: person.apellido2,
      fechaNacimiento: person.fechaNac,
      direccion: person.direccion,
      correo: person.email,
      telefonoFijo: person.telefonoFijo,

    });

  }

  setFormValues2(matricula: MatriculaModel) {
    this.personForm.patchValue({
      idTipoGrupo: matricula.idTipoGrupo,


    });

  }

  onIdentificacionInput(identificacion: number) {
    if (identificacion) {
      this.personaByIdentificacion(identificacion);
    } else {
      this.validacionExistencia = false;
      this.personForm.reset();
    }
  }

  personaByIdentificacion(identificacion: number) {
    this._matriculaService.personByIdentificacion(identificacion).subscribe(
      (personas: PersonaModel[]) => {
        if (personas.length > 0) {
          const person = personas[0];
          this.setFormValues(person);
          this.validacionExistencia = true;
        } else {
          this.validacionExistencia = false;
          this._uiNotificationService.error("No se encontró la persona en el sistema");
        }
      },
      (error) => {
        this._uiNotificationService.error("Ocurrió un error al obtener la persona");
        console.log(error);
      }
    );
  }

  traerProgramas() {
    this._programaService.traerProgramas().subscribe(
      (programas: ProgramaModel[]) => {
        this.programas = programas;
      },
      (error) => {
        this._uiNotificationService.error('Error de conexión');
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

  // get idTipoGrupo() {
  //   return this.formMatricula.get("idTipoGrupo");
  // }


}
