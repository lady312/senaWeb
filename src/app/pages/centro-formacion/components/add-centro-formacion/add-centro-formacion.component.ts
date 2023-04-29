import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CentroFormacionModel } from '@models/centro-formacion.model';
import { RegionalModel } from "@models/RegionalModel";
import { RegionalService } from '@services/regional.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-centro-formacion',
  templateUrl: './add-centro-formacion.component.html',
  styleUrls: ['./add-centro-formacion.component.scss']
})
export class AddCentroFormacionComponent {

  @Input() centroFormacion: CentroFormacionModel;//actualizar

  @Output() store: EventEmitter<CentroFormacionModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formCentroFormacion: UntypedFormGroup;
  regionales: RegionalModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _regionalService: RegionalService,
    private _uiNotificationService: UINotificationService
  ) {
    this.centroFormacion = {
      id: null,
      nombreCentro: '',
      idRegional: null,
      
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerRegional();
    this.setCentroFormacion()
  }

  traerRegional() {
    this._regionalService.traerRegional()
      .subscribe((regional: RegionalModel[]) => {
        this.regionales = regional;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get nombreCentroFormacionField() {
    return this.formCentroFormacion.get('nombreCentro');
  }

  get idRegional() {
    return this.formCentroFormacion.get('idRegional');
  }
  


  setCentroFormacion() {
    if (this.centroFormacion) {
      this.formCentroFormacion.patchValue({
        nombreCentro: this.centroFormacion.nombreCentro,
        idRegional: this.centroFormacion.idRegional,

      })
    }
  }

  private buildForm() {
    this.formCentroFormacion = this.formBuilder.group({
      id: [0],
      nombreCentro: ['', [Validators.required]],
      idRegional: ['', [Validators.required]],
      
    });

    this.formCentroFormacion.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarCentroFormacion() {
    this.store.emit(this.getCentroFormacion());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formCentroFormacion.controls[name];
  }

  getCentroFormacion(): CentroFormacionModel {
    return {
      id: this.centroFormacion?.id,
      nombreCentro: this.getControl('nombreCentro').value,
      idRegional: this.getControl('idRegional').value,
      
    }
  }
}
