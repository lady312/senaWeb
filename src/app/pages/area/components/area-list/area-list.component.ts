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
  @Output() cancel = new EventEmitter<void>();

  numReg:number=10;
  pageActual:number=0;

  enviarNumeroRegistros(event:any){
    const num:number = event.target.value;
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
  buscarArea(event:string){
    let busqueda:AreaModel = this.areas.find(area=>
      area.nombreArea.toUpperCase()===event.toUpperCase());
    if(busqueda){
      this.busqueda.emit(busqueda);
      return;
    }
    busqueda=this.areas.find(area=>
      (area.codigo===event));
    if(busqueda){
      this.busqueda.emit(busqueda);
      return;
    }
    this.cancel.emit();
  }
  cancelarBusqueda(){
    this.cancel.emit();
  }
}
