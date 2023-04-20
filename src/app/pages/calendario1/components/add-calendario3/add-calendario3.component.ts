import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Calendario1Model } from '@models/calendario1.model';
import { ProgramaModel } from '@models/programa.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-calendario3',
  templateUrl: './add-calendario3.component.html',
  styleUrls: ['./add-calendario3.component.scss']
})
export class AddCalendario3Component {

  @Input() calendario3: Calendario1Model;//actualizar
  @Output() store: EventEmitter<Calendario1Model> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() programa:ProgramaModel;
 

  formCalendario3: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.calendario3 = {
      id: null,
      detalleCalendario1: '',
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setCalendario3()
  }


  get detalleCalendario3Field() {
    return this.formCalendario3.get('detalleCalendario3');
  }


  setCalendario3() {
    if (this.calendario3) {
      this.formCalendario3.patchValue({
        detalleCalendario1: this.calendario3.detalleCalendario1
      })
    }
  }

  private buildForm() {
    this.formCalendario3 = this.formBuilder.group({
      id: [0],
      detalleCalendario1: ['', [Validators.required]]
    });

    this.formCalendario3.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarCalendario3() {
    this.store.emit(this.getCalendario3());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formCalendario3.controls[name];
  }

  getCalendario3(): Calendario1Model {
    return {
      id: this.calendario3?.id,
      detalleCalendario1: this.getControl('detalleCalendario3').value,
    }
  }
}
