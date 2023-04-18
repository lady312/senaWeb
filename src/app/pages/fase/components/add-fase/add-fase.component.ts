import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FaseModel } from '@models/fase.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-fase',
  templateUrl: './add-fase.component.html',
  styleUrls: ['./add-fase.component.scss']
})
export class AddFaseComponent {

  @Input() fase: FaseModel;//actualizar

  @Output() store: EventEmitter<FaseModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formFase: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.fase = {
      id: null,
      nombreFase: '',
      codigoFase: ''
    };
    this.buildForm();
  }

  ngOnInit(): void {

    this.setFase()
  }


  get nombreFaseField() {
    return this.formFase.get('nombreFase');
  }

  get codigoFaseField() {
    return this.formFase.get('codigoFase');
  }

  setFase() {
    if (this.fase) {
      this.formFase.patchValue({
        nombreFace: this.fase.nombreFase,
        codigoFase: this.fase.codigoFase
      })
    }
  }

  private buildForm() {
    this.formFase = this.formBuilder.group({
      id: [0],
      nombreFase: ['', [Validators.required]],
      codigoFase: ['', [Validators.required]],
    });

    this.formFase.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarFase() {
    this.store.emit(this.getFase());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formFase.controls[name];
  }

  getFase(): FaseModel {
    return {
      id: this.fase?.id,
      nombreFase: this.getControl('nombreFase').value,
      codigoFase: this.getControl('codigoFase').value
    }
  }
}
