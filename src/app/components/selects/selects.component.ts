import { Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { HttpClient } from '@angular/common/http';
import { ProcesoModel } from '@models/proceso.model';
import { SedeModel } from '@models/sede.model';
import { SedeService } from '@services/sede.service';
import { TipoProgramaModel } from '@models/tipo-programa.model';
import { ProgramaModel } from '@models/programa.model';
import { TipoProgramaService } from '@services/tipo-programa.service';
import { ProgramaService } from '@services/programa.service';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { InfraestructuraService } from '@services/infraestructura.service';

@Component({
  selector: 'app-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss']
})

export class SelectsComponent implements OnInit {

  procesos: ProcesoModel[] = []; // Arreglo de objetos de tipo ProcesoModel
  sedes: SedeModel[] = []; // Arreglo de objetos de tipo SedeModel
  tiposProgramas: TipoProgramaModel[] = []; // Arreglo de objetos de tipo TipoProgramaModel
  programas: ProgramaModel[] = []; // Arreglo de objetos de tipo ProgramaModel
  infraestructuras: InfraestructuraModel[] = []; // Arreglo de objetos de tipo InfraestructuraModel

  numReg = -1; // Número de registros (-1 indica que no hay registros)
  pageActual = 0; // Página actual (inicializada en 0)
  mostrarElemento = false; // Indica si se debe mostrar un elemento o no
  query = ''; // Cadena de búsqueda (inicializada en cadena vacía)

  programasFiltrados: any[] = []; // Arreglo de programas filtrados
  paQueNoMuestre: any [] = []; // Arreglo de elementos que no se muestran

  opcion11: HTMLSelectElement; // Elemento select del HTML con id "opcion1"
  opcion22: HTMLSelectElement; // Elemento select del HTML con id "opcion2"

  private myModal: Modal; // Modal de Bootstrap

  // Propiedades de entrada y salida del componente
  @Input() size: number = 10; // Tamaño del componente (inicializado en 10)
  @Input() msg_true: string = '';
  @Input() msg_false: string = '';
  @Input() checked: boolean = false;
  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter();

  @Output() onChangeFilter = new EventEmitter<Object>();


  constructor(
    private http: HttpClient,
    // private horarioService: HorarioService,
    private sedeService: SedeService,
    private TipoProgramaService: TipoProgramaService,
    private programaService: ProgramaService,
    private infraestructuraService: InfraestructuraService,
  ){
  }

  ngOnInit() {
    this.getInfraestructuras();
    this.getSedes();
    this.getTipoPrograma();
    this.getPrograma();

  this.opcion11 = document.getElementById('opcion1') as HTMLSelectElement;
  this.opcion22 = document.getElementById('opcion2') as HTMLSelectElement;

  this.opcion11.addEventListener('change', () => {
    const opcion11Value = this.opcion11.value;
    this.opcion22.innerHTML = '<option value="">Selecciona una opción</option>';
    if (opcion11Value !== '') {
      // Filtra las infraestructuras disponibles según la opción seleccionada en el menú desplegable this.opcion11
const sedeSeleccionados = this.infraestructuras.filter(infraestructura => infraestructura.idSede === parseInt(opcion11Value));

// Verifica si existen horarios disponibles para la sede seleccionada
if (sedeSeleccionados.length > 0) {

  // Recorre cada una de las infraestructuras filtradas y agrega sus opciones al menú desplegable this.opcion22
  sedeSeleccionados.forEach(infraestructura => {
    const opciones = [
      { value: infraestructura.nombreInfraestructura, text: 'ID del horario' }
    ];
    opciones.forEach(opcion => {
      this.opcion22.innerHTML += `<option value="${opcion.value}">${opcion.value}</option>`;
    });
  });
}

}
});

      }




openModal() {
  const myModal = new bootstrap.Modal(document.getElementById('myModal'));
  myModal.show();
}

enviarNumeroRegistros(num: number) {
  this.numReg = num;
}

getInfraestructuras(): void{
  this.infraestructuraService. traerInfraestructuras()
  .subscribe(infraestructuras => this.infraestructuras=infraestructuras);
}

getSedes(): void {
  this.sedeService.traerSedes()
    .subscribe(sedes => this.sedes = sedes);
}

getTipoPrograma(){
  this.TipoProgramaService.traerTipoPrograma()
  .subscribe(tiposProgramas => this.tiposProgramas = tiposProgramas);
}


getPrograma(): void {
  this.programaService.traerProgramas()
    .subscribe(programas => this.programas = programas);
}



onCheckboxClick() {
  this.mostrarElemento = !this.mostrarElemento;
}
toggle(event) {
  this.checkedChange.emit(event.target.checked);
}

get sizePx() {
  return `${this.size}px`
}

get customTitle() {
  if (this.msg_true || this.msg_false) {
    return this.checked?this.msg_true:this.msg_false
  }
  return '';
}

filter() {
  if (this.query && this.query.trim() !== '') {
    this.programasFiltrados = this.programas.filter((programa) =>
      programa.nombrePrograma.toLowerCase().includes(this.query.toLowerCase())
    );
  } else {
    this.programasFiltrados = this.paQueNoMuestre.slice(); // Se copian todos los elementos del arreglo "procesos"
  }
  this.paQueNoMuestre
}




}
