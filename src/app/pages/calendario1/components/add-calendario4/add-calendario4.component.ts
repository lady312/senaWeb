import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AreaModel } from '@models/area.model';
import { Calendario1Model } from '@models/calendario1.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-calendario4',
  templateUrl: './add-calendario4.component.html',
  styleUrls: ['./add-calendario4.component.scss']
})
export class AddCalendario4Component {

  @Input() calendario4: Calendario1Model;//actualizar
  @Output() store: EventEmitter<Calendario1Model> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() infraestructura:InfraestructuraModel;


  formCalendario4: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.calendario4 = {
      id: null,
      detalleCalendario1: '',
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setCalendario4()
  }


  get detalleCalendario4Field() {
    return this.formCalendario4.get('detalleCalendario4');
  }

  setCalendario4() {
    if (this.calendario4) {
      this.formCalendario4.patchValue({
        detalleCalendario1: this.calendario4.detalleCalendario1
      })
    }
  }

  private buildForm() {
    this.formCalendario4 = this.formBuilder.group({
      id: [0],
      detalleCalendario1: ['', [Validators.required]]
    });

    this.formCalendario4.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarCalendario4() {
    this.store.emit(this.getCalendario4());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formCalendario4.controls[name];
  }

  getCalendario4(): Calendario1Model {
    return {
      id: this.calendario4?.id,
      detalleCalendario1: this.getControl('detalleCalendario4').value,
    }
  }
}
