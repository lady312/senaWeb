import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { ProgramaModel } from '@models/programa.model';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { ProgramaService } from '@services/programa.service';
import { ProyectoFormativoService } from '@services/proyecto-formativo.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-gestion-programa',
  templateUrl: './gestion-programa.component.html',
  styleUrls: ['./gestion-programa.component.scss']
})
export class GestionProgramaComponent  implements OnInit{
  selectedProgram: ProgramaModel;
  selectedProyecto: ProyectoFormativoModel;
  selectedProgramId: number;
  selectedProyectoId: number;// lista de proyectos formativos disponibles
  filteredProjects: ProyectoFormativoModel[] = []; // lista de proyectos formativos filtrados según el programa seleccionado


  @Input() programas: ProgramaModel[] = [];
  @Input() proyectos: ProyectoFormativoModel[] = [];

  @Output() update: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;

  constructor(
    private programaService: ProgramaService,
    private proyectoFormativoService: ProyectoFormativoService,
    private _uiNotificationService: UINotificationService
  ){

  }

  ngOnInit():void {
    this.traerPrograma();
    this.traerProyectoFormativo(Number);
  }

  //traer proyecto formativo
  traerProyectoFormativo(capturarId){
    this.proyectoFormativoService.traerProyecto()
    .subscribe((proyecto:ProyectoFormativoModel[])=>{
      this.proyectos = proyecto;
    }, error=>{
      this._uiNotificationService.error('Error de conexión')
    });
  }


  //traer programa
  traerPrograma() {
    this.programaService.traerProgramas()
      .subscribe((programa: ProgramaModel[]) => {
        this.programas = programa;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }


  capturarIdPrograma(){
    this.selectedProgram = this.programas.find(program => program.id === this.selectedProgramId);
  }

  capturarIdProyecto(){
    this.selectedProyecto = this.proyectos.find(proyecto => proyecto.id === this.selectedProyectoId);
  }

  filterProjects() {
    this.filteredProjects = this.proyectos.filter(project => project.idPrograma === this.selectedProgramId);
  }


  enviarNumeroRegistros(id: number) {
    this.numReg = id;
  }

  agregar() {
    this.create.emit();
  }
}
