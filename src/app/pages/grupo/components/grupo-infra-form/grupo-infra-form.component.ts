import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, NgForm, UntypedFormGroup } from '@angular/forms';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-grupo-infra-form',
  templateUrl: './grupo-infra-form.component.html',
  styleUrls: ['./grupo-infra-form.component.scss']
})
export class GrupoInfraFormComponent {

  @Input() infraestructuras: InfraestructuraModel[] = [];

  @Output() storeInfr = new EventEmitter<InfraestructuraModel>();
  @Output() cancelInfr = new EventEmitter<void>();


  constructor(
    private _uiNotificationService: UINotificationService,
  ){}


  formGrupoInfr: UntypedFormGroup = new FormGroup({
    idInfraestructura:new FormControl(),
    fechaInicial: new FormControl(),
    fechaFinal: new FormControl()
  });
  infraestructura: InfraestructuraModel = null;

  get idInfraestructuraField() {
    return this.formGrupoInfr.get('idInfraestructura');
  }
  get fechaInicialField() {
    return this.formGrupoInfr.get('fechaInicial');
  }
  get fechaFinalField() {
    return this.formGrupoInfr.get('fechaFinal');
  }

  seleccionarInfraestructura(event: any) {
    const value: string = event.target.value;
    const data: string[] = value.split('/');

    const infraestructuraEncontrada = this.infraestructuras.find((infr) =>
      (infr.nombreInfraestructura.toLowerCase() === data[0].toLowerCase()) &&
      (infr.sede.nombreSede.toLowerCase() === data[1].toLowerCase())
    );

    if (infraestructuraEncontrada) {
      this.infraestructura = infraestructuraEncontrada;
      this.infraestructura.horario_infraestructura = {
        idInfraestructura: this.infraestructura.id,
        fechaInicial: new Date(),
        fechaFinal: new Date()
      };
    } else {
      this._uiNotificationService.error('Por favor seleccione una infraestructura existente');
    }
  }


  enviarInfraestructura(form: FormGroup) {
    if (form.valid) {
      this.addInfraestructura();
    } else {
      this._uiNotificationService.error('Por favor seleccione una infraestructura existente');
    }
  }

  addInfraestructura() {
    this.infraestructura.horario_infraestructura.fechaInicial = this.getControl('fechaInicial').value;
    this.infraestructura.horario_infraestructura.fechaFinal = this.getControl('fechaFinal').value
    this.storeInfr.emit(this.infraestructura);
  }


  cancelar() {
    this.cancelInfr.emit();
  }
  private getControl(control: string) {
    return this.formGrupoInfr.controls[control];
  }
}
