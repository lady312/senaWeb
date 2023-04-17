import { Component, Input, Output,EventEmitter } from '@angular/core';
import { InfraestructuraModel } from '@models/infraestructura.model';

@Component({
  selector: 'app-infraestructura-info',
  templateUrl: './infraestructura-info.component.html',
  styleUrls: ['./infraestructura-info.component.scss']
})
export class InfraestructuraInfoComponent {
  @Input() infraestructura:InfraestructuraModel;

  @Output() cerrar = new EventEmitter<void>();

  cerrarInfo(){
    this.cerrar.emit();
  }
}
