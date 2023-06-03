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
import { delay, filter, catchError } from 'rxjs/operators';


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
  @Input() programas: ProgramaModel[] = [];


  personForm: FormGroup;
  activoForm: FormGroup;
  documentoForm: FormGroup;


  validacionExistencia: boolean = false;
  identificacionForm: FormGroup;
  private identificacionSubject: Subject<number> = new Subject<number>();

  isLinear = true;

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
      nombre1: ['', Validators.required],
      nombre2: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required]
    });

    this.activoForm = this._formBuilder.group({
      idTipoGrupo: ['', Validators.required],
      idPrograma: ['', Validators.required]
    })

    this.identificacionSubject.pipe(debounceTime(700)).subscribe((identificacion) => {
      this.personaByIdentificacion(identificacion);
    });

  }

  ngOnInit(): void {
    this.traerTipoGrupos();
    this.traerProgramas();


    this.identificacionSubject.pipe(
      filter(identificacion => identificacion >= 10000000000),
      debounceTime(700)
    ).subscribe((identificacion: number) => {
      this.personaByIdentificacion(identificacion);
    });


  }


  onIdentificacionInput(identificacion: number) {
    if (identificacion) {
      this.identificacionSubject.next(identificacion);
    } else {
      this.validacionExistencia = false;
      this.personForm.reset();
    }
  }

  personaByIdentificacion(identificacion: number) {
    if (identificacion) {
      this._matriculaService.personByIdentificacion(identificacion).pipe(
        debounceTime(500), // Retraso de 500 milisegundos (ajusta según tus necesidades)
        catchError(() => {
          // Manejo silencioso de errores
          return [];
        })
      ).subscribe(
        (personas: PersonaModel[]) => {
          try {
            if (identificacion) {
              // console.log(personas);
              this._uiNotificationService.success("Tus datos han sido registrados anteriormente", "Persona encontrada");
              this.validacionExistencia = true;
            }
          } catch (error) {
          }
        }
      );
    } else {
      this.validacionExistencia = false;
      this.personForm.reset();
    }
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
