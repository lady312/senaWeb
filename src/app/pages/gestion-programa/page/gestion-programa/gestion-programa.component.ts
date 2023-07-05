import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CompetenciaModel } from '@models/competencia.model';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { CompetenciaService } from '@services/competencia.service';
import { ProgramaService } from '@services/programa.service';
import { ProyectoFormativoService } from '@services/proyecto-formativo.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { ActividadProyectoModel } from '@models/actividad-proyecto.model';
import { ActividadProyectoService } from '@services/actividad-proyecto.service'
import { FaseModel } from '@models/fase.model';
import { FaseService } from '@services/fase.service';
import { ProgramaModel } from '@models/programa.model';
import { CompetenciaRapModel } from '@models/competencia_rap.model';
import { CompetenciaRapService } from '@services/competencia-rap.service';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';

@Component({


  selector: 'app-gestion-programa',
  templateUrl: './gestion-programa.component.html',
  styleUrls: ['./gestion-programa.component.scss']
})
export class GestionProgramaComponent implements OnInit {
  competenciasFiltradas: string[] = [];

  selectedActividadP: any;
  selectedCompetenciaRap: any;
  selectedCompetencia: any;
  selectedResultado: any;
  selectedProgram: ProgramaModel;
  selectedProyecto: ProyectoFormativoModel;
  selectedProgramId: number;
  selectedActividadId: number;
  selectedProyectoId: number;// lista de proyectos formativos disponibles
  selectedCompetenciaId: number;
  selectedResultadoId:number;
  filteredProjects: ProyectoFormativoModel[] = []; // lista de proyectos formativos filtrados según el programa seleccionado
  filteredActividad: ActividadProyectoModel[] = [];
  filteredCompetencias: CompetenciaModel[] = [];

  @Input() competencia: CompetenciaModel;
  @Input() Competencias: CompetenciaModel[] = [];
  @Input() resultado: ResultadoAprendizajeModel;
  @Input() Resultados: ResultadoAprendizajeModel[]=[];
  @Input() CompetenciasRaps: CompetenciaRapModel[] = [];
  @Input() actividadProyecto: ActividadProyectoModel;
  @Input() ActividadProyectos: ActividadProyectoModel[] = [];
  @Input() programas: ProgramaModel[] = [];
  @Input() programa: ProgramaModel;
  @Input() proyectos: ProyectoFormativoModel[] = [];
  @Input() resultados: ResultadoAprendizajeModel[] = [];
  @Input() proyecto: ProyectoFormativoModel;
  @Output() update: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() store: EventEmitter<CompetenciaModel> = new EventEmitter();

  formPrograma: UntypedFormGroup;
  formProyecto: UntypedFormGroup;
  formCompetencia: UntypedFormGroup;
  formActividadProyecto: UntypedFormGroup;

  showModalProgramas = false;
  showModalCompetencia = false;
  showModalActividad = false;
  showModalProyecto = false;
  Programa: ProgramaModel = null;
  filesPrograma :FileList;


  private competenciasOriginales: any[];
  fases: FaseModel[] = [];
  Competencia: CompetenciaModel = null;
  Resultado: ResultadoAprendizajeModel = null;
  ActividadProyecto: ActividadProyectoModel = null;
  CompetenciaRap: CompetenciaRapModel = null;

  numReg = 5;

  constructor(
    private formBuilder: FormBuilder,    // private formBuilder : UntypedFormGroup,
    private programaService: ProgramaService,
    private proyectoFormativoService: ProyectoFormativoService,
    private _uiNotificationService: UINotificationService,
    private _actividadProyectoService: ActividadProyectoService,
    private competenciaService: CompetenciaService,
    private faseService : FaseService,
    private _competenciaRap : CompetenciaRapService,
  ){
    this.programa = {
      id: null,
      nombrePrograma: '',
      codigoPrograma: '',
      descripcionPrograma:'',
      idTipoPrograma:null,
      idEstado:1,
      totalHoras:null,
      etapaLectiva:null,
      etapaProductiva:null,
      creditosLectiva:null,
      creditosProductiva:null,
      rutaArchivo:null,
    };
    this.buildForm();
  }


  mostrarArchivo(rutaArchivo: string) {
    const url = `http://localhost:8000${rutaArchivo}`;
    window.open(url);
  }


  get nombreProgramaField() {
      return this.formPrograma.get('nombrePrograma');
    }

  get codigoPrograma() {
      return this.formPrograma.get('codigoPrograma');
    }
  get descripcion() {
      return this.formPrograma.get('descripcionPrograma');
    }

  get idTipoPrograma() {
      return this.formPrograma.get('idTipoPrograma');
    }

  get totalHoras() {
      return this.formPrograma.get('totalHoras');
    }

  get etapaLectiva() {
      return this.formPrograma.get('etapaLectiva');
    }

  get etapaProductiva() {
      return this.formPrograma.get('etapaProductiva');
    }

  get creditosLectiva() {
      return this.formPrograma.get('creditosLectiva');
    }

  get creditosProductiva() {
      return this.formPrograma.get('creditosProductiva');
    }

  get rutaArchivo() {
      return this.formPrograma.get('rutaArchivo');
    }

    setPrograma() {
      if (this.programa) {
        this.formPrograma.patchValue({
          nombrePrograma: this.programa.nombrePrograma,
          codigoPrograma: this.programa.codigoPrograma,
          descripcionPrograma: this.programa.descripcionPrograma,
          idTipoPrograma: this.programa.idTipoPrograma,
          totalHoras: this.programa.totalHoras,
          etapaLectiva: this.programa.etapaLectiva,
          etapaProductiva: this.programa.etapaProductiva,
          creditosLectiva: this.programa.creditosLectiva,
          creditosProductiva: this.programa.creditosProductiva
        })
      }
    }

  private buildForm() {
    this.formPrograma = this.formBuilder.group({
      id: [0],
      nombrePrograma: ['', [Validators.required]],
      codigoPrograma: ['', [Validators.required]],
      descripcionPrograma: ['', [Validators.required]],
      idTipoPrograma: ['', [Validators.required]],
      totalHoras: ['', [Validators.required]],
      etapaLectiva: ['', [Validators.required]],
      etapaProductiva: ['', [Validators.required]],
      creditosLectiva: ['', [Validators.required]],
      creditosProductiva: ['', [Validators.required]],
      rutaArchivo:['', [Validators.required]]
    });

    this.formPrograma.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe((data) => {
      });
  }


  closeModal() {
    this.cancel.emit();
  }

  private getControlP(name: string) {
    return this.formPrograma.controls[name];
  }

  getPrograma(): ProgramaModel {
    return {
      id: this.programa?.id,
      idTipoPrograma: this.getControlP('idTipoPrograma').value,
      nombrePrograma: this.getControlP('nombrePrograma').value,
      codigoPrograma: this.getControlP('codigoPrograma').value,
      descripcionPrograma: this.getControlP('descripcionPrograma').value,
      idEstado: 1,
      totalHoras:this.getControl('totalHoras').value,
      etapaLectiva:this.getControl('etapaLectiva').value,
      etapaProductiva:this.getControl('etapaProductiva').value,
      creditosLectiva:this.getControl('creditosLectiva').value,
      creditosProductiva:this.getControl('creditosProductiva').value,
      rutaArchivo: this.getControl('rutaArchivo').value
    }
  }

  reset() {
    this.programa = null;
    this.showModalProgramas = false;
  }

  agregar() {
    this.showModalProgramas = true;
    this.create.emit;
  }

  agregarProyecto() {
    this.showModalProyecto = true;
    this.create.emit;
    console.log("habriendo el modal");
  }

  //Competencia
  get nombreCompetenciaField() {
    return this.formCompetencia.get('nombreCompetencia');
  }

  get codigoCompetenciaField() {
    return this.formCompetencia.get('codigoCompetencia');
  }
  get idActividadProyecto() {
    return this.formCompetencia.get('idActividadProyecto');
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
  private buildForms() {
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

  private buildFormProyecto() {
    this.formProyecto = this.formBuilder.group({
      id: [0],
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      tiempoEstimado: ['', [Validators.required]],
      numeroTotalRaps: ['', [Validators.required]],
      idCentroFormacion: ['', [Validators.required]],
      idPrograma: ['', [Validators.required]],
    });

    this.formProyecto.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }
  //////////////////Actividad Proyecto/////////////////
  private buildFormss() {
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
  //proyecto Formativo
  private getControlProyecto(name: string) {
    return this.formProyecto.controls[name];
  }

  //Actividad Proyecto
  private getControl(name: string) {
    return this.formActividadProyecto.controls[name];
  }

  getProyecto(): ProyectoFormativoModel {
    return {
      id: this.competencia?.id,
      nombre: this.getControlProyecto('nombre').value,
      codigo: this.getControlProyecto('codigo').value,
      idPrograma: this.getControlProyecto('idPrograma').value,
      tiempoEstimado: this.getControlProyecto('tiempoEstimado').value,
      numeroTotalRaps: this.getControlProyecto('numeroTotalRaps').value,
      idCentroFormacion: this.getControlProyecto('idCentroFormacion').value,
    }
  }

  getCompetencias(): CompetenciaModel {
    return {
      id: this.competencia?.id,
      codigoCompetencia: this.getControls('codigoCompetencia').value,
      nombreCompetencia: this.getControls('nombreCompetencia').value,
      idActividadProyecto: this.getControls('idActividadProyecto').value,
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

  guardarProyecto(proyecto: ProyectoFormativoModel) {
    this.proyectoFormativoService.crearProyecto(proyecto).subscribe(proyectos => {
      this.proyectos.push(proyecto);
      this.resetProyectos();
    });
  }

  guardarActividadProyecto(actividadP: ActividadProyectoModel) {
    this._actividadProyectoService.crearActividadProyecto(actividadP).subscribe(actividadP => {
      this.ActividadProyectos.push(actividadP);
      this.resetActividadP();
      this.showModalActividad = false;
    });
  }

  guardarCompetencia(competencia: CompetenciaModel) {
    this.competenciaService.crearCompetencia(competencia).subscribe(competencias => {
      this.Competencias.push(competencia);
      this.resetCompetencias();
    });
  }

  guardarProgramas(programa: any) {    
      const file = this.filesPrograma;
      const data = new FormData();
      data.append('archivo', file[0]);
      data.append('nombrePrograma', programa.nombrePrograma.toUpperCase());
      data.append('codigoPrograma', programa.codigoPrograma.toUpperCase());
      data.append('descripcionPrograma', programa.descripcionPrograma.toUpperCase());
      data.append('idTipoPrograma', programa.idTipoPrograma.toString());
      data.append('idEstado', programa.idEstado.toString());
      data.append('totalHoras', programa.totalHoras.toString());
      data.append('etapaLectiva', programa.etapaLectiva.toString());
      data.append('etapaProductiva', programa.etapaProductiva.toString());
      data.append('creditosLectiva', programa.creditosLectiva.toString());
      data.append('creditosProductiva', programa.creditosProductiva.toString());

      if (programa.id) {
        this.programaService.actualizarProgramas(data).subscribe((programa) => {
          this.reset();
          this.getPrograma();
        });
      } else {
        this.programaService.crearProgramas(data).subscribe((programa) => {
          this.programas.push(programa);
          this.reset();
          this.getPrograma();
        });
      }
  }


  closeModals() {
    this.cancel.emit();
  }

  resetCompetencias() {
    this.Competencia = null;
    this.showModalCompetencia = false;
  }

  resetProyectos() {
    this.proyecto = null;
    this.showModalProyecto = false;
  }

  resetActividadP() {
    this.ActividadProyecto = null;
    this.showModalActividad = false;
  }

  resetCompetenciasRap(){
    this.CompetenciaRap = null;
  }

  agregarC() {
    this.showModalCompetencia = true;
    this.create.emit();
  }
  agregarAp() {
    this.showModalActividad = true;
    this.create.emit();
  }

  ngOnInit(): void {
    this.setPrograma();
    this.traerPrograma();
    this.traerProyectoFormativo(Number);
    this.traerCompetencia();
    this.traerActividadProyecto(Number);
    this.traerFase();
    this.setActividadProyecto();
    this.setProyecto();
  }


  //Actividad proyecto
  // traerActividadProyecto() {
  //   this._actividadProyectoService.traerActividadProyecto()
  //     .subscribe((actividadProyectos: ActividadProyectoModel[]) => {
  //       this.ActividadProyectos = actividadProyectos;
  //     }, error => {
  //       this._uiNotificationService.error('Error de conexión');
  //     });
  // }
  traerActividadProyecto(capturarId) {
    this._actividadProyectoService.traerActividadProyecto()
      .subscribe((actividadProyecto: ActividadProyectoModel[]) => {
        this.ActividadProyectos = actividadProyecto;
      }, error => {
        this._uiNotificationService.error('Error de conexión')
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
  traerProyectoFormativo(capturarId) {
    this.proyectoFormativoService.traerProyecto()
      .subscribe((proyecto: ProyectoFormativoModel[]) => {
        this.proyectos = proyecto;
      }, error => {
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

  setProyecto() {
    if (this.proyecto) {
      this.formProyecto.patchValue({
        nombre: this.proyecto.nombre,
        codigo: this.proyecto.codigo,
        tiempoEstimado: this.proyecto.tiempoEstimado,
        numeroTotalRaps: this.proyecto.numeroTotalRaps,
        idCentroFormacion: this.proyecto.idCentroFormacion,
        idPrograma: this.proyecto.idPrograma,
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

  // Métodos de selecion
  seleccionarActividadP(ActividadProyecto: any) {
    this.selectedActividadP = ActividadProyecto;
  }

  seleccionarCompetencia(Competencia: any) {
    this.selectedCompetencia = Competencia;
  }

  seleccionarResultado(Resultado: any) {
    this.selectedResultado = Resultado;
  }


  //metodos para capturar id
  capturarIdPrograma() {
    this.selectedProgram = this.programas.find(program => program.id === this.selectedProgramId);
  }

  capturarIdActividad() {
    this.selectedActividadP = this.ActividadProyectos.find(actividad => actividad.id === this.selectedActividadId);
    console.log(this.selectedActividadP,'estas son las competencias filtradas');
  }

  capturarIdCompetencia() {
    this.selectedCompetencia = this.Competencias.find(competencia => competencia.id === this.selectedCompetenciaId);
  }

  capturarIdProyecto() {
    this.selectedProyecto = this.proyectos.find(proyecto => proyecto.id === this.selectedProyectoId);
  }

  capturarIdResultado() {
    this.selectedResultado = this.resultados.find(resultado => resultado.id === this.selectedResultadoId);
  }

  filterProjects() {
    this.filteredProjects = this.proyectos.filter(project => project.idPrograma === this.selectedProgramId);
    console.log(this.filteredProjects,'estas son las competencias filtradas');
  }

  filterActividad(){
    this.filteredActividad = this.ActividadProyectos.filter(actividad => actividad.idFase === this.selectedProyectoId);
  }

  filterCompetencias(){
    this.filteredCompetencias = this.Competencias.filter(competencia => competencia.idActividadProyecto === this.selectedCompetenciaId);
    // console.log(this.filteredCompetencias,'estas son las competencias filtradas');
  }


  eliminarEtiqueta(competencia: CompetenciaModel): void {
    const index = this.Competencias.indexOf(competencia);
    if (index !== -1) {
      this.Competencias.splice(index, 1);
    }
  }

  eliminarResultado(resultado: ResultadoAprendizajeModel):void {
    const index = this.resultados.indexOf(resultado);
    if(index !== -1){
      this.Resultados.splice(index, 1);
      console.log("resultado", resultado);
    }
  }

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
    } 
    else {
      this.Competencias = [...this.competenciasOriginales];
    }
  
    this.Competencias = this.Competencias.filter(c => c.idActividadProyecto === actividadP.id);
  
    // Asignar las competencias filtradas a una propiedad en el componente
    this.competenciasFiltradas = this.Competencias.map(c => c.codigoCompetencia);
  }

  //muestra los resultados de una competencia
  traerCompetenciasRaps(id:number) {
    this._competenciaRap.getCompetenciaRapByCompetencia(id)
      .subscribe((competenciaRap: CompetenciaRapModel[]) => {
        this.CompetenciasRaps = competenciaRap;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
      this.resetCompetenciasRap();
  }

}















