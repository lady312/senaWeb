import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProgramaModel } from '@models/programa.model';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { ProgramaService } from '@services/programa.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-proyecto-formativo',
  templateUrl: './add-proyecto-formativo.component.html',
  styleUrls: ['./add-proyecto-formativo.component.scss']
})
export class AddProyectoFormativoComponent {

  @Input() proyecto: ProyectoFormativoModel;//actualizar

  @Output() store: EventEmitter<ProyectoFormativoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formProyecto: UntypedFormGroup;
  Programas: ProgramaModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private programaService: ProgramaService,
    private _uiNotificationService: UINotificationService
  ) {
    this.proyecto = {
      id: null,
      nombre: '',
      codigo: '',
      idPrograma:null,
      tiempoEstimado:null,
      numeroTotalRaps:null,
      idCentroFormacion:null,
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerPrograma();
    this.setProyecto()
  }

  traerPrograma() {
    this.programaService.traerProgramas()
      .subscribe((programa: ProgramaModel[]) => {
        this.Programas = programa;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get nombreProyectoField() {
    return this.formProyecto.get('nombre');
  }

  get codigoProyecto() {
    return this.formProyecto.get('codigo');
  }

  get idPrograma() {
    return this.formProyecto.get('idPrograma');
  }

  get tiempoEstimado() {
    return this.formProyecto.get('tiempoEstimado');
  }

  get numeroTotalRaps() {
    return this.formProyecto.get('numeroTotalRaps');
  }

  get idCentroFormacion() {
    return this.formProyecto.get('idCentroFormacion');
  }
  

  setProyecto() {
    if (this.proyecto) {
      this.formProyecto.patchValue({
        nombre: this.proyecto.nombre,
        codigo: this.proyecto.codigo,
        idPrograma: this.proyecto.idPrograma,
        tiempoEstimado: this.proyecto.tiempoEstimado,
        numeroTotalRaps: this.proyecto.numeroTotalRaps,
        idCentroFormacion: this.proyecto.idCentroFormacion
      })
    }
  }

  private buildForm() {
    this.formProyecto = this.formBuilder.group({
      id: [0],
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      idPrograma: ['', [Validators.required]],
      tiempoEstimado: ['', [Validators.required]],
      numeroTotalRaps: ['', [Validators.required]],
      idCentroFormacion: ['', [Validators.required]]
    });

    this.formProyecto.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  guardarProyecto() {
    this.store.emit(this.getProyecto());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formProyecto.controls[name];
  }

  getProyecto(): ProyectoFormativoModel {
    return {
      id: this.proyecto?.id,
      idPrograma: this.getControl('idPrograma').value,
      nombre: this.getControl('nombre').value,
      codigo: this.getControl('codigo').value,
      tiempoEstimado: this.getControl('tiempoEstimado').value,
      numeroTotalRaps: this.getControl('numeroTotalRaps').value,
      idCentroFormacion: this.getControl('idCentroFormacion').value

      
    }
  }
}
