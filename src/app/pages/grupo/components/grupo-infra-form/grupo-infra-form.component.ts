import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  infraestructura: InfraestructuraModel = null;
  fechaInicial: Date = new Date();
  fechaFinal: Date = new Date();

  seleccionarInfraestructura(event:any) {
    const idInfra = event.target.value;
    this.infraestructuras.map((infr) => {
      if(infr.id==idInfra){
        this.infraestructura=infr;
      }
    })
    console.log(this.infraestructura);
    
  }
  seleccionarFechaInicial(event:any){
    const fecha = event.target.value
    this.fechaInicial=fecha;
  }
  seleccionarFechaFinal(event:any){
    const fecha = event.target.value
    console.log(fecha);
    this.fechaFinal=fecha;
  }
  addInfraestructura() {
    this.infraestructura.horario_infraestructura.fechaInicial=new Date(this.fechaInicial);
    this.infraestructura.horario_infraestructura.fechaFinal=this.fechaFinal;
    this.storeInfr.emit(this.infraestructura);
  }
  cancelar() {
    this.cancelInfr.emit();
  }
}
