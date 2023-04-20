import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Calendario1Model } from '@models/calendario1.model';
import { SedeModel } from '@models/sede.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';

@Component({
  selector: 'app-add-calendario1',
  templateUrl: './add-calendario1.component.html',
  styleUrls: ['./add-calendario1.component.scss']
})
export class AddCalendario1Component implements OnInit{



 @Input() calendario1: Calendario1Model;//actualizar
  @Output() store: EventEmitter<Calendario1Model> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() sede:SedeModel;


  formCalendario1: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.calendario1 = {
      id: null,
      detalleCalendario1: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setCalendario1()
  }


  get detalleCalendario1Field() {
    return this.formCalendario1.get('detalleCalendario1');
  }


  setCalendario1() {
    if (this.calendario1) {
      this.formCalendario1.patchValue({
        detalleCalendario1: this.calendario1.detalleCalendario1
      })
    }
  }

  private buildForm() {
    this.formCalendario1 = this.formBuilder.group({
      id: [0],
      detalleCalendario1: ['', [Validators.required]]
    });

    this.formCalendario1.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarCalendario1() {
    this.store.emit(this.getCalendario1());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formCalendario1.controls[name];
  }

  getCalendario1(): Calendario1Model {
    return {
      id: this.calendario1?.id,
      detalleCalendario1: this.getControl('detalleCalendario1').value,
    }
  }



}
