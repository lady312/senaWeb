import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CompetenciaModel } from '@models/competencia';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-competencia',
  templateUrl: './add-competencia.component.html',
  styleUrls: ['./add-competencia.component.scss']
})
export class AddCompetenciaComponent {


  @Input() competencia: CompetenciaModel; //actualizar

  @Output() store: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formCompetencia: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.competencia = {
      id: null,
      nombreCompetencia: '',
      detalle: '',
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setCompetencia()
  }


  get nombreCompetenciaField() {
    return this.formCompetencia.get('nombreCompetencia');
  }

  get detalleField() {
    return this.formCompetencia.get('detalle');
  }

  setCompetencia() {
    if (this.competencia) {
      this.formCompetencia.patchValue({
        nombreCompetencia: this.competencia.nombreCompetencia,
        detalle: this.competencia.detalle
      })
    }
  }

  private buildForm() {
    this.formCompetencia = this.formBuilder.group({
      id: [0],
      nombreCompetencia: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
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

  private getControl(nombreCompetencia: string) {
    return this.formCompetencia.controls[nombreCompetencia];
  }

  getCompetencia(): CompetenciaModel {
    return {
      id: this.competencia?.id,
      detalle: this.getControl('detalle').value,
      nombreCompetencia: this.getControl('nombreCompetencia').value
    }
  }

}
