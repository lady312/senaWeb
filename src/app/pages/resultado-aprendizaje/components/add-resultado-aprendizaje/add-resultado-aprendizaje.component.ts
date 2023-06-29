import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CompetenciaModel } from '@models/competencia.model';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';
import { TipoResultadoAprendizajeModel } from '@models/tipo-resultado.model';
import { CompetenciaService } from '@services/competencia.service';
import { TipoResultadoService } from '@services/tipo-resultado.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-add-resultado-aprendizaje',
  templateUrl: './add-resultado-aprendizaje.component.html',
  styleUrls: ['./add-resultado-aprendizaje.component.scss']
})
export class AddResultadoAprendizajeComponent {

  @Input() tipoRap: TipoResultadoAprendizajeModel; 
  @Input() competencia: CompetenciaModel;
  @Input() rap: ResultadoAprendizajeModel;//actualizar
  @Output() store: EventEmitter<ResultadoAprendizajeModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formRap: UntypedFormGroup;
  TipoRap: TipoResultadoAprendizajeModel = null;
  Competencia : CompetenciaModel = null;
  competencias: CompetenciaModel [] = [];
  tipoResultados: TipoResultadoAprendizajeModel [] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService,
    private _tipoResultadoService: TipoResultadoService,
    private _competenciaService: CompetenciaService
  ) {
    this.rap = {
      id: null,
      rap: '',
      codigoRap: '',
      numeroHoras:null,
      idTipoRaps:null,
      idCompetencia: null
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerTipoResultado();
    this.traerCompetencia();
    this.setRap()
  }

  traerCompetencia(){
    this._competenciaService.traerCompetencias()
    .subscribe((competencia: CompetenciaModel[]) => {
      this.competencias = competencia;
    }, error => {
      this._uiNotificationService.error('Error de conexión');
    });
  }

  traerTipoResultado() {
    this._tipoResultadoService.traerTipoResultado()
      .subscribe((tipoResultado: TipoResultadoAprendizajeModel[]) => {
        this.tipoResultados = tipoResultado;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get nombreRapField() {
    return this.formRap.get('rap');
  }

  get codigoRapField() {
    return this.formRap.get('codigoRap');
  }

  get numeroHoras(){
    return this. formRap.get('numeroHoras');
  }

  get tipoResultado(){
    return this.formRap.get('idTipoRaps');
  }

  get competenciaField(){
    return this.formRap.get('idCompetencia');
  }

  setRap() {
    if (this.rap) {
      this.formRap.patchValue({
        rap: this.rap.rap,
        codigoRap: this.rap.codigoRap,
        numeroHoras:this.rap.numeroHoras,
        idTipoRaps: this.rap.idTipoRaps,
        idCompetencia: this.rap.idCompetencia
      })
    }
  }

  private buildForm() {
    this.formRap = this.formBuilder.group({
      id: [0],
      rap: ['', [Validators.required]],
      codigoRap: ['', [Validators.required]],
      numeroHoras: ['', [Validators.required]],
      idTipoRaps: ['', [Validators.required]],
      idCompetencia: ['', [Validators.required]],
    });

    this.formRap.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarRap() {
    this.store.emit(this.getRap());
    console.log(this.getRap());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formRap.controls[name];
  }

  getRap(): ResultadoAprendizajeModel {
    return {
      id: this.rap?.id,
      codigoRap: this.getControl('codigoRap').value,
      rap: this.getControl('rap').value,
      numeroHoras: this.getControl('numeroHoras').value,
      idTipoRaps: this.getControl('idTipoRaps').value,
      idCompetencia:this.getControl('idCompetencia').value
    }
  }


}
