import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-campo-busqueda',
  templateUrl: './campo-busqueda.component.html',
  styleUrls: ['./campo-busqueda.component.scss']
})
export class CampoBusquedaComponent {
    
  @Input() message:string;
  @Input() lista:string;

  @Output() busqueda = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  campoBusqueda:string='';

  buscar(){
    this.busqueda.emit(this.campoBusqueda);
  }
  cancelar(){
    this.cancel.emit();
  }
}
