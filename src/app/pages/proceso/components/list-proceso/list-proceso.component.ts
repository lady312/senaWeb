import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProcesoModel } from '@models/proceso.model';




@Component({
  selector: 'app-list-proceso',
  templateUrl: './list-proceso.component.html',
  styleUrls: ['./list-proceso.component.scss']
})
export class ListProcesoComponent {
  query: string;
  @Input() procesos: ProcesoModel[] = [];

  @Output() update: EventEmitter<ProcesoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  procesosFiltrados: any[] = [];
  numReg = 5;
  pageActual = 0;




  constructor() {
  }


  filter() {
    if (this.query && this.query.trim() !== '') {
      this.procesosFiltrados = this.procesos.filter((proceso) =>
        proceso.nombreProceso.toLowerCase().includes(this.query.toLowerCase()) ||
        proceso.descripcion.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.procesosFiltrados = this.procesos.slice(); // Se copian todos los elementos del arreglo "procesos"
    }
  }


  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(proceso: ProcesoModel) {
    this.update.emit(proceso);
  }

  eliminar(idProceso: number) {
    this.delete.emit(idProceso);
  }

  agregar() {
    this.create.emit();
  }

}
