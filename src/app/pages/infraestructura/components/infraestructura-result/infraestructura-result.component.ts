import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-infraestructura-result',
  templateUrl: './infraestructura-result.component.html',
  styleUrls: ['./infraestructura-result.component.scss']
})
export class InfraestructuraResultComponent {

  @Input() resultadoBusqueda: InfraestructuraModel;
  @Input() imgBusqueda:string;

  @Output() cancel= new EventEmitter<void>();
  @Output() update= new EventEmitter<InfraestructuraModel>();
  @Output() delete= new EventEmitter<number>();
  @Output() close= new EventEmitter<void>();

  actualizar(){
    this.update.emit(this.resultadoBusqueda);
    this.close.emit();
  }
  eliminar(){
    this.delete.emit(this.resultadoBusqueda.id);
    this.close.emit();
  }
  cerrarConsulta(){
    this.cancel.emit();
  }
}
