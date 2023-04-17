import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { CompetenciaModel } from '@models/competencia.model';


@Component({
  selector: 'app-competencias',
  templateUrl: './competencias.component.html',
  styleUrls: ['./competencias.component.scss']
})
export class CompetenciasComponent {

  @Input() rol: CompetenciaModel;//actualizar

  @Output() store: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formRol: UntypedFormGroup;
  // objEmpresa: EmpresaModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    // private empresaService: EmpresaService,
    private _uiNotificationService: UINotificationService
  ) {
    this.rol = {
      id: null,
      nombreCompetencia: '',
      detalleCompetencia: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {
    // this.traerEmpresas();
    this.setRol()
  }

  // traerEmpresas() {
  //   this.empresaService.traerEmpresas()
  //     .subscribe((empresa: EmpresaModel[]) => {
  //       this.objEmpresa = empresa;
  //     }, error => {
  //       this._uiNotificationService.error('Error de conexión');
  //     });
  // }

  get nombreCompetenciaField() {
    return this.formRol.get('nombreCompetencia');
  }

  get detalleCompetenciaField() {
    return this.formRol.get('detalleCompetencia');
  }

  setRol() {
    if (this.rol) {
      this.formRol.patchValue({
        nombreCompetencia: this.rol.nombreCompetencia,
        detalleCompetencia: this.rol.detalleCompetencia
      })
    }
  }

  private buildForm() {
    this.formRol = this.formBuilder.group({
      id: [0],
      nombreCompetencia: ['', [Validators.required]],
      detalleCompetencia: ['', [Validators.required]],
    });

    this.formRol.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarRol() {
    this.store.emit(this.getRol());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formRol.controls[name];
  }

  getRol(): CompetenciaModel {
    return {
      id: this.rol?.id,
      detalleCompetencia: this.getControl('detalleCompetencia').value,
      nombreCompetencia: this.getControl('nombreCompetencia').value
    }
  }


}
