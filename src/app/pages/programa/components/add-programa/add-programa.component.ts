import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoProgramaModel } from '@models/tipo-programa.model';
import { ProgramaModel } from '@models/programa.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime} from 'rxjs/operators'
import { TipoProgramaService } from '@services/tipo-programa.service';

@Component({
  selector: 'app-add-programa',
  templateUrl: './add-programa.component.html',
  styleUrls: ['./add-programa.component.scss']
})
export class AddProgramaComponent implements OnInit {

  @Input() programa: ProgramaModel;//actualizar

  @Output() store: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formPrograma: UntypedFormGroup;
  tipoProgramas: TipoProgramaModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private TipoProgramaService: TipoProgramaService,
    private _uiNotificationService: UINotificationService
  ) {
    this.programa = {
      id: null,
      nombrePrograma: '',
      codigoPrograma: '',
      descripcionPrograma:'',
      idTipoPrograma:null,
      idEstado:1

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerTipoPrograma();
    this.setPrograma()
  }

  traerTipoPrograma() {
    this.TipoProgramaService.traerTipoPrograma()
      .subscribe((tipo_programa: TipoProgramaModel[]) => {
        this.tipoProgramas = tipo_programa;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get nombreProgramaField() {
    return this.formPrograma.get('nombrePrograma');
  }

  get codigoPrograma() {
    return this.formPrograma.get('codigoPrograma');
  }
  get descripcion() {
    return this.formPrograma.get('descripcionPrograma');
  }

  get idTipoPrograma() {
    return this.formPrograma.get('idTipoPrograma');
  }
  

  setPrograma() {
    if (this.programa) {
      this.formPrograma.patchValue({
        nombrePrograma: this.programa.nombrePrograma,
        codigoPrograma: this.programa.codigoPrograma,
        descripcionPrograma: this.programa.descripcionPrograma,
        idTipoPrograma: this.programa.idTipoPrograma
      })
    }
  }

  private buildForm() {
    this.formPrograma = this.formBuilder.group({
      id: [0],
      nombrePrograma: ['', [Validators.required]],
      codigoPrograma: ['', [Validators.required]],
      descripcionPrograma: ['', [Validators.required]],
      idTipoPrograma: ['', [Validators.required]]
    });

    this.formPrograma.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarPrograma() {
    this.store.emit(this.getPrograma());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formPrograma.controls[name];
  }

  getPrograma(): ProgramaModel {
    return {
      id: this.programa?.id,
      idTipoPrograma: this.getControl('idTipoPrograma').value,
      nombrePrograma: this.getControl('nombrePrograma').value,
      codigoPrograma: this.getControl('codigoPrograma').value,
      descripcionPrograma: this.getControl('descripcionPrograma').value,
      idEstado: 1
    }
  }
}
