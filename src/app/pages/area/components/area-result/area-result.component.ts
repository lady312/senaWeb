import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AreaModel } from '@models/area.model';

@Component({
  selector: 'app-area-result',
  templateUrl: './area-result.component.html',
  styleUrls: ['./area-result.component.scss']
})
export class AreaResultComponent {

  @Input() resultadoBusqueda:AreaModel;

  @Output() cancel = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<AreaModel>();
  @Output() delete = new EventEmitter<number>();

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
