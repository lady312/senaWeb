import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SedeModel } from '@models/sede.model';

@Component({
  selector: 'app-sede-result',
  templateUrl: './sede-result.component.html',
  styleUrls: ['./sede-result.component.scss']
})
export class SedeResultComponent {

  @Input() resultadoBusqueda:SedeModel;

  @Output() cancel= new EventEmitter<void>();
  @Output() update= new EventEmitter<SedeModel>();
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
