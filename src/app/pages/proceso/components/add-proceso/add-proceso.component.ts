import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProcesoModel } from '@models/proceso.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-proceso',
  templateUrl: './add-proceso.component.html',
  styleUrls: ['./add-proceso.component.scss']
})
export class AddProcesoComponent implements OnInit {
  myForm = new FormGroup({
    myControlName: new FormControl()
  });
  procesosfiltrado = [];
  busqueda: string;
  @Input() proceso: ProcesoModel; // actualizar
  @Output() store: EventEmitter<ProcesoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formProceso: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService,
    private modalService: NgbModal,

  ) {
    this.proceso = {
      id: null,
      nombreProceso: '',
      descripcion: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setProceso()
  }


  get nombreProcesoField() {
    return this.formProceso.get('nombreProceso');
  }

  get descripcionField() {
    return this.formProceso.get('descripcion');
  }

  setProceso() {
    if (this.proceso) {
      this.formProceso.patchValue({
        nombreProceso: this.proceso.nombreProceso,
        descripcion: this.proceso.descripcion
      });
    }
  }

  private buildForm() {
    this.formProceso = this.formBuilder.group({
      id: [0],
      nombreProceso: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.formProceso.valueChanges
      .pipe(
        debounceTime(350),
      ).subscribe(data => {
      });
  }

  guardarProceso() {
    this.store.emit(this.getProceso());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(nombreProceso: string) {
    return this.formProceso.controls[nombreProceso];
  }

  getProceso(): ProcesoModel {
    return {
      id: this.proceso?.id,
      descripcion: this.getControl('descripcion').value,
      nombreProceso: this.getControl('nombreProceso').value
    };
  }
  openAddProcesoModal() {
    this.modalService.open(AddProcesoComponent);
  }

}
