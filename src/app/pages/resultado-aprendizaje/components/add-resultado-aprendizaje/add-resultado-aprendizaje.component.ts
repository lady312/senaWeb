import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-add-resultado-aprendizaje',
  templateUrl: './add-resultado-aprendizaje.component.html',
  styleUrls: ['./add-resultado-aprendizaje.component.scss']
})
export class AddResultadoAprendizajeComponent {

  @Input() rap: ResultadoAprendizajeModel;//actualizar

  @Output() store: EventEmitter<ResultadoAprendizajeModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formRap: UntypedFormGroup;
  // objEmpresa: EmpresaModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    // private empresaService: EmpresaService,
    private _uiNotificationService: UINotificationService
  ) {
    this.rap = {
      id: null,
      rap: '',
      codigoRap: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {
    // this.traerRap();
    this.setRap()
  }

  get nombreRapField() {
    return this.formRap.get('rap');
  }

  get codigoRapField() {
    return this.formRap.get('codigoRap');
  }

  setRap() {
    if (this.rap) {
      this.formRap.patchValue({
        rap: this.rap.rap,
        codigoRap: this.rap.codigoRap
      })
    }
  }

  private buildForm() {
    this.formRap = this.formBuilder.group({
      id: [0],
      rap: ['', [Validators.required]],
      codigoRap: ['', [Validators.required]],
    });

    this.formRap.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarRap() {
    this.store.emit(this.getRap());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formRap.controls[name];
  }

  getRap(): ResultadoAprendizajeModel {
    return {
      id: this.rap?.id,
      codigoRap: this.getControl('codigoRap').value,
      rap: this.getControl('rap').value
    }
  }


}
