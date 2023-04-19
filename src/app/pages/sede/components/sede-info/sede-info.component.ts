import { Component, EventEmitter, Input, Output} from '@angular/core';
import { SedeModel } from '@models/sede.model';

@Component({
  selector: 'app-sede-info',
  templateUrl: './sede-info.component.html',
  styleUrls: ['./sede-info.component.scss']
})
export class SedeInfoComponent{

  @Input() sede:SedeModel;

  @Output() cerrar= new EventEmitter<void>();
  cerrarInfo(){
    this.cerrar.emit();
  }
}
