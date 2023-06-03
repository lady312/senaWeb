import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { CompetenciaModel } from '@models/competencia.model';
import { ActividadProyectoModel } from '@models/actividad-proyecto.model';
import { ActividadAprendizajeModel } from '@models/actividad-aprendizaje.model';
import { ActividadProyectoService } from '@services/actividad-proyecto.service';


@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent {

  @Input() competencia: CompetenciaModel;//actualizar

  @Output() store: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formCompetencia: UntypedFormGroup;
  actividadProyecto: ActividadProyectoModel[] = [];




  constructor(
    private formBuilder: UntypedFormBuilder,
    private actividadProyectos: ActividadProyectoService,
    private _uiNotificationService: UINotificationService
  ) {
    this.competencia = {
      id: null,
      nombreCompetencia: '',
      codigoCompetencia: '',
      idActividadProyecto:null,

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerActividadProyecto();

    this.setCompetencia()
  }
  traerActividadProyecto() {
    this.actividadProyectos.traerActividadProyecto()
      .subscribe((proceso: ActividadProyectoModel[]) => {
        this.actividadProyecto = proceso;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }



  get nombreCompetenciaField() {
    return this.formCompetencia.get('nombreCompetencia');
  }

  get codigoCompetenciaField() {
    return this.formCompetencia.get('codigoCompetencia');
  }
  get idActividadProyecto() {
    return this. formCompetencia.get('idActividadProyecto');
  }

  setCompetencia() {
    if (this.competencia) {
      this.formCompetencia.patchValue({
        nombreCompetencia: this.competencia.nombreCompetencia,
        codigoCompetencia: this.competencia.codigoCompetencia,
        idActividadProyecto: this.competencia.idActividadProyecto,

      })
    }
  }

  private buildForm() {
    this.formCompetencia = this.formBuilder.group({
      id: [0],
      nombreCompetencia: ['', [Validators.required]],
      codigoCompetencia: ['', [Validators.required]],
      idActividadProyecto: ['', [Validators.required]],
    });

    this.formCompetencia.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarCompetencia() {
    this.store.emit(this.getCompetencia());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formCompetencia.controls[name];
  }

  getCompetencia(): CompetenciaModel {
    return {
      id: this.competencia?.id,
      codigoCompetencia: this.getControl('codigoCompetencia').value,
      nombreCompetencia: this.getControl('nombreCompetencia').value,
      idActividadProyecto:this.getControl('idActividadProyecto').value,
      
    }
  }


}
