import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Calendario1Model } from '@models/calendario1.model';
import { GrupoModel } from '@models/grupo.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-add-calendario2',
  templateUrl: './add-calendario2.component.html',
  styleUrls: ['./add-calendario2.component.scss']
})
export class AddCalendario2Component {

  @Input() calendario2: Calendario1Model;//actualizar
  @Output() store: EventEmitter<Calendario1Model> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() grupo: GrupoModel;
  
  formCalendario2: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.calendario2 = {
      id: null,
      detalleCalendario1: '',
    };
    this.buildForm();
  }


  ngOnInit(): void {
    this.setCalendario2()
  }


  get detalleCalendario2Field() {
    return this.formCalendario2.get('detalleCalendario2');
  }



  setCalendario2() {
    if (this.calendario2) {
      this.formCalendario2.patchValue({
        detalleCalendario1: this.calendario2.detalleCalendario1
      })
    }
  }


  private buildForm() {
    this.formCalendario2 = this.formBuilder.group({
      id: [0],
      detalleCalendario1: ['', [Validators.required]]
    });

    this.formCalendario2.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }


  guardarCalendario2() {
    this.store.emit(this.getCalendario2());
  }


  closeModal() {
    this.cancel.emit();
  }


  private getControl(name: string) {
    return this.formCalendario2.controls[name];
  }

  
  getCalendario2(): Calendario1Model {
    return {
      id: this.calendario2?.id,
      detalleCalendario1: this.getControl('detalleCalendario2').value,
    }
  }
}
