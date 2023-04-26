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

  
  
  competenciasVisibles = new Map<number, boolean>();


  formCompetencia: UntypedFormGroup;
  formPrograma: UntypedFormGroup;
  formActividadProyecto: UntypedFormGroup;

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
    private cdr: ChangeDetectorRef,

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
  get nombreActividadProgramaField() {
    return this.formActividadProyecto.get('nombreActividadProyecto');
  }

  get idFase() {
    return this.formActividadProyecto.get('idFase');
  }
  get codigoAP() {
    return this.formActividadProyecto.get('codigoAP');
  }

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


  closeModal() {
    this.cancel.emit();
  }


  private getControl(name: string) {
    return this.formActividadProyecto.controls[name];
  }

  getActividadProyecto(): ActividadProyectoModel {
    return {
      id: this.actividadProyecto?.id,
      nombreActividadProyecto: this.getControl('nombreActividadProyecto').value,
      idFase: this.getControl('idFase').value,
      codigoAP: this.getControl('codigoAP').value,
    }
  }
  // guardarProgramas(actividadProyecto: ActividadProyectoModel) {
  //   if (actividadProyecto.id) {
  //     this._actividadProyectoService.actualizarActividadProyecto(actividadProyecto).subscribe(actividadProyectos => {
  //       this.getActividadProyecto();
  //       this.resets();
       
  //     });
  //   } else {
  //     this._actividadProyectoService.crearActividadProyecto(actividadProyecto).subscribe(actividadProyectos => {
  //       this.resets();
  //       this.getActividadProyecto();
  //       console.log ('hhhhhhhhhhhhhhhh')
  //     })
  //     this.showModalActividad=false; 
  //     this.resets();
  //   }
  // }

  guardarProgramas(actidadActividadP: ActividadProyectoModel) {
    this._actividadProyectoService.crearActividadProyecto(actidadActividadP).subscribe(ActividadProyectos => {
      this.ActividadProyectos.push(actidadActividadP);
      this.reset();
      this.showModalActividad=false;
    });
  }

  // iiiiiiiiiiiiiiiiiiiiiiiiiiii





  
  get nombreCompetenciaField() {
    return this.formCompetencia.get('nombreCompetencia');
  }

  get codigoCompetenciaField() {
    return this.formCompetencia.get('codigoCompetencia');
  }
  get idActividadProyecto() {
    return this. formCompetencia.get('idActividadProyecto');
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

//////////////
  guardarCompetencia(competencia: CompetenciaModel) {
    this.competenciaService.crearCompetencia(competencia).subscribe(competencias => {
      this.Competencias.push(competencia);
      this.reset();
    });
  }
  ///////////////////
  

  ///////////////////

  closeModals() {
    this.cancel.emit();
  }

  private getControls(name: string) {
    return this.formCompetencia.controls[name];
  }
  reset() {
    this.Competencia = null;
    this.showModalCompetencia = false;
  }
  //////////////////////////////////////////////////////77
  resets() {
    this.  ActividadProyecto = null;
    this.showModalActividad = false;
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhiiiiiii')
  }
  agregarAp(){
    this.showModalActividad = true;
    this.create.emit();
  }
  ///////////////////////////////////////////////////////////

  agregarC() {
    this.showModalCompetencia = true;
    this.create.emit();
  }


  getCompetencias(): CompetenciaModel {
    return {
      id: this.competencia?.id,
      codigoCompetencia: this.getControls('codigoCompetencia').value,
      nombreCompetencia: this.getControls('nombreCompetencia').value,
      idActividadProyecto:this.getControls('idActividadProyecto').value,
    }
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

  traerActividadProyecto() {
    this._actividadProyectoService.traerActividadProyecto()
      .subscribe((actividadProyectos:ActividadProyectoModel[]) => {
        this.ActividadProyectos = actividadProyectos;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }
  traerFase() {
    this.faseService.traerFase()
      .subscribe((fase: FaseModel[]) => {
        this.fases = fase;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
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

  traerCompetencia() {
    this.competenciaService.traerCompetencias()
      .subscribe((competencia: CompetenciaModel[]) => {
        this.Competencias = competencia;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }
  

  eliminarEtiqueta(competencia: CompetenciaModel): void {
    const index = this.Competencias.indexOf(competencia);
    if (index !== -1) {
      this.Competencias.splice(index, 1);
    }
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////7///////////////////////

  // eliminarEtiquetaaa(actividadProyecto: ActividadProyectoModel): void {
  //   const index = this.ActividadProyectos.indexOf(actividadProyecto);
  //   if (index !== -1) {
  //     this.ActividadProyectos.splice(index, 1);
      
  //     // Ocultar las competencias que contienen la actividad proyecto eliminada
  //     this.Competencias.forEach((competencia) => {
        
  //       if (Array.isArray(competencia.idActividadProyecto) && competencia.idActividadProyecto.some((actividad) => actividad.id === actividadProyecto.id)) {
  //         cy.visible = false;
  //       }
  //     });
  //   }
  // }
  ////////////////////////////////////////////////////////////////7
  
//   eliminarEtiquet(actividadProyecto: ActividadProyectoModel): void {
//     const index = this.ActividadProyectos.indexOf(actividadProyecto);
//     if (index !== -1) {
//       this.ActividadProyectos.splice(index, 1);
      
//     }
    
//   }
// // }

// eliminarEtiquet(actividadProyecto: ActividadProyectoModel): void {
//   const index = this.ActividadProyectos.indexOf(actividadProyecto);
//   if (index !== -1) {
//     this.ActividadProyectos.splice(index, 1);

//     // Ocultar las competencias que contienen la actividad proyecto eliminada
//     this.Competencias.forEach((competencia) => {
//       if (Array.isArray(competencia.idActividadProyecto) && competencia.idActividadProyecto.some((actividad) => actividad.id === actividadProyecto.id)) {
//         competencia.mostrar= false;
//       }
//     });
//   }
// }

// eliminarEtiquetaaa(actividadProyecto: ActividadProyectoModel): void {
//     const index = this.ActividadProyectos.indexOf(actividadProyecto);
//     if (index !== -1) {
//       this.ActividadProyectos.splice(index, 1);
      
//       // Ocultar las competencias que contienen la actividad proyecto eliminada
//       this.Competencias.forEach((competencia) => {
//         if (Array.isArray(competencia.idActividadProyecto) && competencia.idActividadProyecto.some((actividad) => actividad.id === actividadProyecto.id)) {
//           competencia['mostrar'] = false;
//         }
//       });
//       this.cdr.detectChanges();
//     }
//   }


eliminarEtiquetaaaa(actividadProyecto: ActividadProyectoModel): void {
  const index = this.ActividadProyectos.indexOf(actividadProyecto);
  if (index !== -1) {
    this.ActividadProyectos.splice(index, 1);
   
    this.actualizarListaCompetencias();
    // Ocultar las competencias que contienen la actividad proyecto eliminada
    this.Competencias = this.Competencias.filter(c =>
      c.idActividadProyecto!== actividadProyecto.id ,
      console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
    );
    
  }
}

actualizarListaCompetencias(): void {
  for (let i = 0; i < this.ActividadProyectos.length; i++) {
    const simi = this.ActividadProyectos[i].id ;
    this.Competencias = this.Competencias.filter(c =>
      c.idActividadProyecto !== simi
    );
    console.log('gggggggggggggggggg')
  }
}

}

 

//////////////////////////////////////////////////////////
 









