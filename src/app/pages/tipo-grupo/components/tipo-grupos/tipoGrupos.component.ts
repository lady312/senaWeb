import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { NgModule } from '@angular/core';
import { GrupoModel } from '@models/grupo.model';

@Component({
  selector: 'app-tipogrupos',
  templateUrl: './tipoGrupos.component.html',
  styleUrls: ['./tipoGrupos.component.scss'],
})

export class TipogruposComponent{

  @Output() store: EventEmitter<TipoGrupoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  tipoGrupos: TipoGrupoModel = null;

  @Input() tipoGrupo: TipoGrupoModel; //inputs para escuchar eventos desde otros componentes y traer información
  formTipoGrupo: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.tipoGrupo = {
      id: null,
      nombreTipoGrupo: '',
    };
    this.buildForm();
  }

  ngOnInit()
  {
    this.setTipoGrupo();
  }

  get nombreTipoGrupoField() {
    return this.formTipoGrupo.get('nombreTipoGrupo');
  }

  setTipoGrupo() {
    if (this.tipoGrupo) {
      this.formTipoGrupo.patchValue({
        nombreTipoGrupo: this.tipoGrupo.nombreTipoGrupo,
      });
    }
  }

  private buildForm() {
    this.formTipoGrupo = this.formBuilder.group({
      id: [0],
      nombreTipoGrupo: ['', [Validators.required]],
    });

    this.formTipoGrupo.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {

      });
  }

  guardarTipoGrupo() {
    this.store.emit(this.getTipoGrupo());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(nombreTipoGrupo: string) {
    return this.formTipoGrupo.controls[nombreTipoGrupo];
  }

  getTipoGrupo(): TipoGrupoModel {
    return {
      id: this.tipoGrupo?.id,
      nombreTipoGrupo: this.getControl('nombreTipoGrupo').value,
    }
  }

}
