import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup } from '@angular/forms';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';

@Component({
  selector: 'app-grupo-infra-form',
  templateUrl: './grupo-infra-form.component.html',
  styleUrls: ['./grupo-infra-form.component.scss']
})
export class GrupoInfraFormComponent {

  @Input() infraestructuras: InfraestructuraModel[] = [];

  @Output() storeInfr = new EventEmitter<InfraestructuraModel>();
  @Output() cancelInfr = new EventEmitter<void>();

  formGrupoInfr: UntypedFormGroup = new FormGroup({
    fechaInicial: new FormControl(),
    fechaFinal: new FormControl()
  });
  infraestructura: InfraestructuraModel = null;

  constructor(
    private datePipe: DatePipe
  ) { }


  get fechaInicialField() {
    return this.formGrupoInfr.get('fechaInicial');
  }
  get fechaFinalField() {
    return this.formGrupoInfr.get('fechaFinal');
  }

  seleccionarInfraestructura(event: any) {
    const idInfra = event.target.value;
    this.infraestructuras.map((infr) => {
      if (infr.id == idInfra) {
        this.infraestructura = infr;
      }
    })
    this.infraestructura.horario_infraestructura = {
      idInfraestructura: this.infraestructura.id,
      fechaInicial: new Date(),
      fechaFinal: new Date()
    };

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
