import { ChangeDetectorRef, Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { CompetenciaModel } from '@models/competencia.model';
import { ProgramaModel } from '@models/programa.model';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { CompetenciaService } from '@services/competencia.service';
import { ProgramaService } from '@services/programa.service';
import { ProyectoFormativoService } from '@services/proyecto-formativo.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { filter } from 'rxjs/operators';import { ActividadProyectoModel } from '@models/actividad-proyecto.model';
import {ActividadProyectoService }from '@services/actividad-proyecto.service'
import { FaseModel } from '@models/fase.model';
import { FaseService } from '@services/fase.service';
@Component({


  selector: 'app-gestion-programa',
  templateUrl: './gestion-programa.component.html',
  styleUrls: ['./gestion-programa.component.scss']
})
export class GestionProgramaComponent  implements OnInit{

  selectedActividadP: any ;
  selectedCompetencia: any;


  selectedProgram: ProgramaModel;
  selectedProyecto: ProyectoFormativoModel;
  selectedProgramId: number;
  selectedProyectoId: number;// lista de proyectos formativos disponibles
  
  filteredProjects: ProyectoFormativoModel[] = []; // lista de proyectos formativos filtrados según el programa seleccionado

  @Input() competencia: CompetenciaModel;
  @Input() Competencias: CompetenciaModel[] = [];

  

  @Input() actividadProyecto: ActividadProyectoModel;
  @Input() ActividadProyectos: ActividadProyectoModel[] = [];

  @Input() programas: ProgramaModel[] = [];
  @Input() proyectos: ProyectoFormativoModel[] = [];
  @Input() programa: ProgramaModel;

  @Output() update: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  @Output() store: EventEmitter<CompetenciaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  
  formCompetencia: UntypedFormGroup;
  formPrograma: UntypedFormGroup;
  formActividadProyecto: UntypedFormGroup;

  private competenciasOriginales: any[];

 

  fases: FaseModel[] = [];
  

  showModalCompetencia = false;
  Competencia: CompetenciaModel = null;

  showModalActividad=false;
  ActividadProyecto: ActividadProyectoModel = null;



  numReg = 5;

  

  constructor(
    
    private formBuilder: FormBuilder,    // private formBuilder : UntypedFormGroup,
    private programaService: ProgramaService,
    private proyectoFormativoService: ProyectoFormativoService,
    private _uiNotificationService: UINotificationService,
    private _actividadProyectoService: ActividadProyectoService,
    private faseService: FaseService,


    private competenciaService: CompetenciaService, ActividadProyectoService:ActividadProyectoService,
  ){
    this.Competencia={
      id:null,
      nombreCompetencia:'',
      codigoCompetencia:'',
      idActividadProyecto:null,
    
    }
    this.buildForm();
    {
      this.actividadProyecto = {
        id: null,
        nombreActividadProyecto: '',
        idFase: null,
        codigoAP:''
      };
      this.buildForms();
    }
  }


//Competencia
  get nombreCompetenciaField() {
    return this.formCompetencia.get('nombreCompetencia');
  }

  get codigoCompetenciaField() {
    return this.formCompetencia.get('codigoCompetencia');
  }
  get idActividadProyecto() {
    return this. formCompetencia.get('idActividadProyecto');
  }

//Activida proyecto
  get nombreActividadProgramaField() {
    return this.formActividadProyecto.get('nombreActividadProyecto');
  }

  get idFase() {
    return this.formActividadProyecto.get('idFase');
  }
  get codigoAP() {
    return this.formActividadProyecto.get('codigoAP');
  }




  /////////Competencia////////////////

  private buildForm() {
    this.formCompetencia = this.formBuilder.group({
      id: [0],
      nombreCompetencia: ['', [Validators.required]],
      idFase: ['', [Validators.required]],
      idActividadProyecto: ['', [Validators.required]],
    });

    this.formCompetencia.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

//////////////////Actividad Proyecto/////////////////
  private buildForms() {
    this.formActividadProyecto = this.formBuilder.group({
      id: [0],
      nombreActividadProyecto: ['', [Validators.required]],
      idFase: ['', [Validators.required]],
      codigoAP: ['', [Validators.required]],
    });

    this.formActividadProyecto.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      })
  }

  

//Competencia
  private getControls(name: string) {
    return this.formCompetencia.controls[name];
  }
  //Actividad Proyecto
  private getControl(name: string) {
    return this.formActividadProyecto.controls[name];
  }




  getCompetencias(): CompetenciaModel {
    return {
      id: this.competencia?.id,
      codigoCompetencia: this.getControls('codigoCompetencia').value,
      nombreCompetencia: this.getControls('nombreCompetencia').value,
      idActividadProyecto:this.getControls('idActividadProyecto').value,
    }
  }
  getActividadProyecto(): ActividadProyectoModel {
    return {
      id: this.actividadProyecto?.id,
      nombreActividadProyecto: this.getControl('nombreActividadProyecto').value,
      idFase: this.getControl('idFase').value,
      codigoAP: this.getControl('codigoAP').value,
    }
  }






  guardarCompetencia(competencia: CompetenciaModel) {
    this.competenciaService.crearCompetencia(competencia).subscribe(competencias => {
      this.Competencias.push(competencia);
      this.reset();
    });
  }

  guardarProgramas(actidadActividadP: ActividadProyectoModel) {
    this._actividadProyectoService.crearActividadProyecto(actidadActividadP).subscribe(ActividadProyectos => {
      this.ActividadProyectos.push(actidadActividadP);
      this.reset();
      this.showModalActividad=false;
    });
  }

  
  closeModals() {
    this.cancel.emit();
  }

  closeModal() {
    this.cancel.emit();
  }



  reset() {
    this.Competencia = null;
    this.showModalCompetencia = false;
  }
  resets() {
    this.  ActividadProyecto = null;
    this.showModalActividad = false;
  }




  agregarC() {
    this.showModalCompetencia = true;
    this.create.emit();
  }
  agregarAp(){
    this.showModalActividad = true;
    this.create.emit();
  }


 

  ngOnInit():void {
    this.setPrograma();
    this.traerPrograma();
    this.traerProyectoFormativo(Number);
    this.traerCompetencia();

    this.traerActividadProyecto();
    this.traerFase();
    this.setActividadProyecto()
  }


  //Actividad proyecto
  traerActividadProyecto() {
    this._actividadProyectoService.traerActividadProyecto()
      .subscribe((actividadProyectos:ActividadProyectoModel[]) => {
        this.ActividadProyectos = actividadProyectos;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  //Fase para la actividad proyecto
  traerFase() {
    this.faseService.traerFase()
      .subscribe((fase: FaseModel[]) => {
        this.fases = fase;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
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

  //Traer Competencia
  traerCompetencia() {
    this.competenciaService.traerCompetencias()
      .subscribe((competencia: CompetenciaModel[]) => {
        this.Competencias = competencia;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }




  setCompetencias() {
    if (this.competencia) {
      this.formCompetencia.patchValue({
        nombreCompetencia: this.competencia.nombreCompetencia,
        codigoCompetencia: this.competencia.codigoCompetencia,
        idActividadProyecto: this.competencia.idActividadProyecto,

      })
    }
  }
  setActividadProyecto() {
    if (this.actividadProyecto) {
      this.formActividadProyecto.patchValue({
        nombreActividadPrograma: this.actividadProyecto.nombreActividadProyecto,
        idFase: this.actividadProyecto.idFase,
        codigoAP: this.actividadProyecto.codigoAP,

      })
    }
  }
  setPrograma() {
    if (this.programa) {
      this.formPrograma.patchValue({
        nombrePrograma: this.programa.nombrePrograma,
        codigoPrograma: this.programa.codigoPrograma,
        descripcionPrograma: this.programa.descripcionPrograma,
        idTipoPrograma: this.programa.idTipoPrograma,
     
      })
    }
  }
  
  // Método para seleccionar la actividad proyecto
  seleccionarActividadP(ActividadProyecto: any) {
    this.selectedActividadP = ActividadProyecto;
  }

  seleccionarCompetencia(Competencia: any) {
    this.selectedCompetencia = Competencia; 
  }


////////////////////////////////////////////////////////////////////////////selet filtros/////////////
  capturarIdPrograma(){
    this.selectedProgram = this.programas.find(program => program.id === this.selectedProgramId);
  }

  capturarIdProyecto(){
    this.selectedProyecto = this.proyectos.find(proyecto => proyecto.id === this.selectedProyectoId);
  }

  filterProjects() {
    this.filteredProjects = this.proyectos.filter(project => project.idPrograma === this.selectedProgramId);
  }

//////////////////////////////////////////////////////////////////7

 
  

  eliminarEtiqueta(competencia: CompetenciaModel): void {
    const index = this.Competencias.indexOf(competencia);
    if (index !== -1) {
      this.Competencias.splice(index, 1);
    }
  }

///////////////Funcional etiquetas ///////////////////7

eliminarEtiquet(actividadProyecto: ActividadProyectoModel): void {
  const index = this.ActividadProyectos.indexOf(actividadProyecto);
  if (index !== -1) {
    // Obtener el ID de la actividad proyecto eliminada
    const idAP = actividadProyecto.id;
    
    // Filtrar las competencias por el ID de la actividad proyecto eliminada
    const competenciasAEliminar = this.Competencias.filter(c => c.idActividadProyecto === idAP);

    // Eliminar las competencias relacionadas con la actividad proyecto eliminada
    competenciasAEliminar.forEach(c => {
      const indexCompetencia = this.Competencias.indexOf(c);
      if (indexCompetencia !== -1) {
        this.Competencias.splice(indexCompetencia, 1);
      }
    });

    // Eliminar la actividad proyecto de la lista de actividad proyecto a mostrar en la interfaz de usuario
    this.ActividadProyectos.splice(index, 1);
    
  }
  
}


// Variable para almacenar la copia del array original

filtrarCompetencias(actividadP: ActividadProyectoModel) {
  this.actividadProyecto = actividadP;
 
  if (!this.competenciasOriginales) {
   
    this.competenciasOriginales = [...this.Competencias];
  } else {

    this.Competencias = [...this.competenciasOriginales];
  }

  this.Competencias = this.Competencias.filter(c => c.idActividadProyecto === actividadP.id);
 
}

}





 









