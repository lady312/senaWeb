import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ResultadoModel } from '@models/resultado.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-resultado',
  templateUrl: './add-resultado.component.html',
  styleUrls: ['./add-resultado.component.scss']
})
export class AddResultadoComponent {


  @Input() resultado: ResultadoModel; //actualizar

  @Output() store: EventEmitter<ResultadoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formResultado: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.resultado = {
      id: null,
      nombreResultado: '',
      detalleResultado: '',
      fechaInicioResultado: null,
      fechaFinalResultado: null
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setResultado()
  }


  get nombreResultadoField() {
    return this.formResultado.get('nombreResultado');
  }

  get detalleResultadoField() {
    return this.formResultado.get('detalleResultado');
  }

  get fechaInicioResultadoField() {
    return this.formResultado.get('fechaInicioResultado');
  }

  get fechaFinalResultadoField() {
    return this.formResultado.get('fechaFinalResultado');
  }

  setResultado() {
    if (this.resultado) {
      this.formResultado.patchValue({
        nombreResultado: this.resultado.nombreResultado,
        detalleResultado: this.resultado.detalleResultado,
        fechaInicioResultado: this.resultado.fechaInicioResultado,
        fechaFinalResultado: this.resultado.fechaFinalResultado
      })
    }
  }

  private buildForm() {
    this.formResultado = this.formBuilder.group({
      id: [0],
      nombreResultado: ['', [Validators.required]],
      detalleResultado: ['', [Validators.required]],
      fechaInicioResultado: [0, [Validators.required]],
      fechaFinalResultado: [0, [Validators.required]],

    });

    this.formResultado.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarResultado() {
    this.store.emit(this.getResultado());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(nombreResultado: string) {
    return this.formResultado.controls[nombreResultado];
  }

  getResultado(): ResultadoModel {
    return {
      id: this.resultado?.id,
      detalleResultado: this.getControl('detalleResultado').value,
      nombreResultado: this.getControl('nombreResultado').value,
      fechaInicioResultado: this.getControl('fechaInicioResultado').value,
      fechaFinalResultado: this.getControl('fechaFinalResultado').value
    }
  }
}
