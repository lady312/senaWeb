import { Component, Input,Output,EventEmitter } from '@angular/core';
import { InfraestructuraModel } from '@models/infraestructura.model';

@Component({
  selector: 'app-grupo-infra',
  templateUrl: './grupo-infra.component.html',
  styleUrls: ['./grupo-infra.component.scss']
})
export class GrupoInfraComponent {
  @Input() infraestructura:InfraestructuraModel = null;
  
  @Output() remove = new EventEmitter<number>();
  borrarInfr(){
    this.remove.emit(this.infraestructura.id);
  }
}
