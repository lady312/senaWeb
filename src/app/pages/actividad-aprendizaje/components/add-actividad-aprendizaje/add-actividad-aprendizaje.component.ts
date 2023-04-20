import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActividadAprendizajeModel } from '@models/actividad-aprendizaje.model';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';
import { ResultadoAprendizajeService } from '@services/resultado-aprendizaje.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-actividad-aprendizaje',
  templateUrl: './add-actividad-aprendizaje.component.html',
  styleUrls: ['./add-actividad-aprendizaje.component.scss']
})
export class AddActividadAprendizajeComponent implements OnInit {

  @Input() actividadAprendizaje: ActividadAprendizajeModel;//actualizar

  @Output() store: EventEmitter<ActividadAprendizajeModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formAA: UntypedFormGroup;
  resultadoAprendizaje: ResultadoAprendizajeModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private resultadoAprendizajeService: ResultadoAprendizajeService,
    private _uiNotificationService: UINotificationService
  ) {
    this.actividadAprendizaje = {
      id: null,
      NombreAA: '',
      codigoAA: '',
      idEstado: 1,
      rap: null

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerResultadoAprendizaje();
    this.setAA()
  }
 
  traerResultadoAprendizaje() {
    this.resultadoAprendizajeService.traerRap()
      .subscribe((proceso: ResultadoAprendizajeModel[]) => {
        this.resultadoAprendizaje = proceso;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get NombreAAField() {
    return this.formAA.get('NombreAA');
  }

  get rap() {
    return this.formAA.get('rap');
  }
  get codigo() {
    return this.formAA.get('codigoAA');
  }

  setAA() {
    if (this.actividadAprendizaje) {
      this.formAA.patchValue({
        NombreAA: this.actividadAprendizaje.NombreAA,
        codigoAA: this.actividadAprendizaje.codigoAA,
        idProceso: this.actividadAprendizaje.rap,
      })
    }
  }

  private buildForm() {
    this.formAA = this.formBuilder.group({
      id: [0],
      NombreAA: ['', [Validators.required]],
      codigoAA: ['', [Validators.required]],
      rap: ['', [Validators.required]],
    });

    this.formAA.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarAA() {
    this.store.emit(this.getAA());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formAA.controls[name];
  }

  getAA(): ActividadAprendizajeModel {
    return {
      id: this.actividadAprendizaje?.id,
      rap: this.getControl('rap').value,
      NombreAA: this.getControl('NombreAA').value,
      codigoAA: this.getControl('codigoAA').value,
      idEstado: 1
    }
  }
}
