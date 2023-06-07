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


import { TipoProgramaModel } from '@models/tipo-programa.model';
import { TipoProgramaService } from '@services/tipo-programa.service';
import { ProyectoFormativoService } from '@services/proyecto-formativo.service';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { PersonaService } from '@services/persona.service';
import { TipoIdentificacionModel } from '@models/tipo-identificacion.model';


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
  @Input() proyectoFormativos: ProyectoFormativoModel[] = [];

  @Input() tipoIdent: TipoIdentificacionModel[] = [];


  personForm: FormGroup;
  activoForm: FormGroup;
  documentoForm: FormGroup;


  title = 'angular-stepper-ejercicio';

  stepperForm!: FormGroup;


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

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
    private _tipoGrupoService: TipoGrupoService,
    private _tipoIdentificacion: PersonaService
  ) {

    this.personForm = this._formBuilder.group({
      identificacion: ['', Validators.required],
      nombre1: ['', Validators.required],
      nombre2: ['', Validators.required],
      apellido1: ['', Validators.required],
      apellido2: ['', Validators.required],
      fechaNac: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefonoFijo: ['', Validators.required]
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

    this.tipoIdentificacion();


    this.identificacionSubject.pipe(
      filter(identificacion => identificacion >= 10000000000),
      debounceTime(700)
    ).subscribe((identificacion: number) => {
      this.personaByIdentificacion(identificacion);
    });

  }

  tipoIdentificacion()
  {
    this._tipoIdentificacion.traerTiposId().subscribe(
      (tIdentificacion: TipoIdentificacionModel[]) => {
        this.tipoIdent = tIdentificacion;
        console.log(this.tipoIdent)
      },
      (error) => {
        // this._uiNotificationService.error('Error al obtener los tipos de identificación', 'Tipo identificación');
      }
    )
  }


  onIdentificacionInput(identificacion: number)
   {
    if (identificacion) {
      this.identificacionSubject.next(identificacion);
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
          this.personForm.get('identificacion').setValue(persona.identificacion);
          this.personForm.get('nombre1').setValue(persona.nombre1);
          this.personForm.get('nombre2').setValue(persona.nombre2);
          this.personForm.get('apellido1').setValue(persona.apellido1);
          this.personForm.get('apellido2').setValue(persona.apellido2);
          this.personForm.get('fechaNac').setValue(persona.fechaNac);
          this.personForm.get('direccion').setValue(persona.direccion);
          this.personForm.get('email').setValue(persona.email);
          this.personForm.get('telefonoFijo').setValue(persona.telefonoFijo);
        } else {
          this.validacionExistencia = false;
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
