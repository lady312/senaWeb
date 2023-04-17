import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActividadProyectoModel } from '@models/actividad-proyecto.model';
import { FaseModel } from '@models/fase.model';
import { FaseService } from '@services/fase.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-actividad-proyecto',
  templateUrl: './add-actividad-proyecto.component.html',
  styleUrls: ['./add-actividad-proyecto.component.scss']
})
export class AddActividadProyectoComponent {

  @Input() actividadProyecto: ActividadProyectoModel;//actualizar

  @Output() store: EventEmitter<ActividadProyectoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formActividadProyecto: UntypedFormGroup;
  fases: FaseModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private faseService: FaseService,
    private _uiNotificationService: UINotificationService
  ) {
    this.actividadProyecto = {
      id: null,
      nombreActividadProyecto: '',
      idFase: null,
      codigoAP:''
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerFase();
    this.setActividadProyecto()
  }

  traerFase() {
    this.faseService.traerFase()
      .subscribe((fase: FaseModel[]) => {
        this.fases = fase;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get nombreActividadProgramaField() {
    return this.formActividadProyecto.get('nombreActividadProyecto');
  }

  get idFase() {
    return this.formActividadProyecto.get('idFase');
  }
  get codigoAP() {
    return this.formActividadProyecto.get('codigoAP');
  }


  setActividadProyecto() {
    if (this.actividadProyecto) {
      this.formActividadProyecto.patchValue({
        nombreActividadPrograma: this.actividadProyecto.nombreActividadProyecto,
        idFase: this.actividadProyecto.idFase,
        codigoAP: this.actividadProyecto.codigoAP,

      })
    }
  }

  private buildForm() {
    this.formActividadProyecto = this.formBuilder.group({
      id: [0],
      nombreActividadProyecto: ['', [Validators.required]],
      idFase: ['', [Validators.required]],
      codigoAP: ['', [Validators.required]],
    });

    this.formActividadProyecto.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarActividadProyecto() {
    this.store.emit(this.getActividadProyecto());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formActividadProyecto.controls[name];
  }

  getActividadProyecto(): ActividadProyectoModel {
    return {
      id: this.actividadProyecto?.id,
      nombreActividadProyecto: this.getControl('nombreActividadProyecto').value,
      idFase: this.getControl('idFase').value,
      codigoAP: this.getControl('codigoAP').value,
    }
  }

}
