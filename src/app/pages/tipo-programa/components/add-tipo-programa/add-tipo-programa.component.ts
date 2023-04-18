import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup,Validators } from '@angular/forms';
import { TipoProgramaModel } from '@models/tipo-programa.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-add-tipo-programa',
  templateUrl: './add-tipo-programa.component.html',
  styleUrls: ['./add-tipo-programa.component.scss']
})
export class AddTipoProgramaComponent implements OnInit{
  
  @Input() tipoP: TipoProgramaModel;//actualizar

  @Output() store: EventEmitter<TipoProgramaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formTipoP: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.tipoP = {
      id: null,
      nombreTipoPrograma: '',
      descripcion: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {

    this.setTipoP()
  }


  get nombreTipoProgramaField() {
    return this.formTipoP.get('nombreTipoPrograma');
  }

  get descripcionField() {
    return this.formTipoP.get('descripcion');
  }

  setTipoP() {
    if (this.tipoP) {
      this.formTipoP.patchValue({
        nombreTipoPrograma: this.tipoP.nombreTipoPrograma,
        descripcion: this.tipoP.descripcion
      })
    }
  }

  private buildForm() {
    this.formTipoP = this.formBuilder.group({
      id: [0],
      nombreTipoPrograma: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.formTipoP.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoP() {
    this.store.emit(this.getTipoP());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formTipoP.controls[name];
  }

  getTipoP(): TipoProgramaModel {
    return {
      id: this.tipoP?.id,
      descripcion: this.getControl('descripcion').value,
      nombreTipoPrograma: this.getControl('nombreTipoPrograma').value
    }
  }
}
