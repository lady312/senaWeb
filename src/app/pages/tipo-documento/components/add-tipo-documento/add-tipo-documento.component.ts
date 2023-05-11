import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProcesoModel } from '@models/proceso.model';
import { TipoDocumentoModel } from '@models/tipo-documento.model';
import { ProcesoService } from '@services/proceso.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';




@Component({

  selector: 'app-add-tipo-documento',
  templateUrl: './add-tipo-documento.component.html',
  styleUrls: ['./add-tipo-documento.component.scss']
})
export class AddTipoDocumentoComponent implements OnInit {

  @Input() proceso: ProcesoModel ; // actualizar
  @Input() Procesos: ProcesoModel [] = [];
  @Input() tipoDocumento: TipoDocumentoModel; // actualizar
  @Output() store: EventEmitter<TipoDocumentoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  formProcesos: UntypedFormGroup;
  formTipoDoc: UntypedFormGroup;
  showModalProcesos = false;
  Proceso: ProcesoModel = null;

  constructor(

    private formBuilder: UntypedFormBuilder,
    private procesoService: ProcesoService,
    private _uiNotificationService: UINotificationService,
  ) {
    this.tipoDocumento = {
      id: null,
      tituloDocumento: '',
      descripcion: '',
      idEstado: 1,
      idProceso: null

    };
    this.buildForm();


    this.proceso = {
      id: null,
      nombreProceso: '',
      descripcion: '',
    };
    this.buildForms();

  }



  get nombreProcesosField() {
    return this.formProcesos.get('nombreProceso');
  }

  get descripcionField() {
    return this. formProcesos.get('descripcion');
  }

  setProcesos() {
    if (this.proceso) {
      this.formProcesos.patchValue({
        nombreActividades: this.proceso.nombreProceso,
        descripcion: this.proceso.descripcion
      });
    }
  }

  private buildForms() {
    this.formProcesos = this.formBuilder.group({
      id: [0],
      nombreProceso: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.formProcesos.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }


  guardarProcesos(proceso: ProcesoModel) {

      this.procesoService.crearProceso(proceso).subscribe(procesos => {
        this.Procesos.push(procesos);
        this.reset();
      });
  }

  closeModals() {
    this.cancel.emit();
  }

  private getControls(nombreProceso: string) {
    return this.formProcesos.controls[nombreProceso];
  }

  getProcesos(): ProcesoModel {
    return {
      id: this. proceso?.id,
      descripcion: this.getControls('descripcion').value,
      nombreProceso: this.getControls('nombreProceso').value
    };
  }

  reset() {
    this.Proceso = null;
    this.showModalProcesos = false;
  }

  agregar() {
    this.showModalProcesos = true;
    this.create.emit();
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ngOnInit(): void {
    this.traerProcesos();
    this.setTipoDoc();
  }

  traerProcesos() {
    this.procesoService.traerProcesos()
      .subscribe((proceso: ProcesoModel[]) => {
        this.Procesos = proceso;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get tituloDocumentoField() {
    return this.formTipoDoc.get('tituloDocumento');
  }

  get idProceso() {
    return this.formTipoDoc.get('idProceso');
  }
  get descripcion() {
    return this.formTipoDoc.get('descripcion');
  }

  setTipoDoc() {
    if (this.tipoDocumento) {
      this.formTipoDoc.patchValue({
        tituloDocumento: this.tipoDocumento.tituloDocumento,
        descripcion: this.tipoDocumento.descripcion,
        idProceso: this.tipoDocumento.idProceso,
      });
    }
  }

  private buildForm() {
    this.formTipoDoc = this.formBuilder.group({
      id: [0],
      tituloDocumento: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      idProceso: ['', [Validators.required]],
    });

    this.formTipoDoc.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoDoc() {
    this.store.emit(this.getTipoDoc());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formTipoDoc.controls[name];
  }

  getTipoDoc(): TipoDocumentoModel {
    return {
      id: this.tipoDocumento?.id,
      idProceso: this.getControl('idProceso').value,
      tituloDocumento: this.getControl('tituloDocumento').value,
      descripcion: this.getControl('descripcion').value,
      idEstado: 1
    };
  }

  

}
