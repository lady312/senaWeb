import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AreaModel } from '@models/area.model';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent {

  @Input() areas:AreaModel[]=[];

  @Output() delete= new EventEmitter<number>();
  @Output() create= new EventEmitter<void>();
  @Output() update= new EventEmitter<AreaModel>();
  @Output() busqueda = new EventEmitter<AreaModel>();

  numReg:number=10;
  pageActual:number=0;
  nombreArea:string='';

  enviarNumeroRegistros(num: number){
    this.numReg = num;
  }

  actualizar(area: AreaModel){
    this.update.emit(area);
  }

  eliminar(id:number){
    this.delete.emit(id);
  }
  agregar(){
    this.create.emit();
  }

  //revisar
  buscarArea(){
    const busqueda:AreaModel = this.areas.find(area=>
      area.nombreArea.toUpperCase()===this.nombreArea.toUpperCase());
      this.busqueda.emit(busqueda);
  }
}
