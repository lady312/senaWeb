import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { ProgramaModel } from '@models/programa.model';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { ProgramaService } from '@services/programa.service';
import { ProyectoFormativoService } from '@services/proyecto-formativo.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

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

  @Input() programa: ProgramaModel;
  @Input() programas: ProgramaModel[] = [];
  @Input() proyectos: ProyectoFormativoModel[] = [];
  @Output() update: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  formPrograma: UntypedFormGroup;
  showModalProgramas = false;
  Programa: ProgramaModel = null;

  numReg = 5;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private programaService: ProgramaService,
    private proyectoFormativoService: ProyectoFormativoService,
    private _uiNotificationService: UINotificationService
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
      creditosProductiva:null
    };
    this.buildForm();
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

  
  setPrograma() {
    if (this.programa) {
      this.formPrograma.patchValue({
        nombrePrograma: this.programa.nombrePrograma,
        codigoPrograma: this.programa.codigoPrograma,
        descripcionPrograma: this.programa.descripcionPrograma,
        idTipoPrograma: this.programa.idTipoPrograma,
        totalHoras:this.programa.totalHoras,
        etapaLectiva:this.programa.etapaLectiva,
        etapaProductiva:this.programa.etapaProductiva,
        creditosLectiva:this.programa.creditosLectiva,
        creditosProductiva:this.programa.creditosProductiva
      })
    }
  }

  private buildForm() {
    this.formPrograma =  this.formBuilder.group({
      id: [0],
      nombrePrograma: ['', [Validators.required]],
      codigoPrograma: ['', [Validators.required]],
      descripcionPrograma: ['', [Validators.required]],
      idTipoPrograma: ['', [Validators.required]],
      totalHoras:['', [Validators.required]],
      etapaLectiva:['', [Validators.required]],
      etapaProductiva:['', [Validators.required]],
      creditosLectiva:['', [Validators.required]],
      creditosProductiva:['', [Validators.required]]
    });

    this.formPrograma.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe((data) => {
      });
  }

  guardarProgramas(programa: ProgramaModel) {

    this.programaService.crearProgramas(programa).subscribe(programa => {
      this.programas.push(programa);
      this.reset();
    });
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(name: string) {
    return this.formPrograma.controls[name];
  }

  getPrograma(): ProgramaModel {
    return {
      id: this.programa?.id,
      idTipoPrograma: this.getControl('idTipoPrograma').value,
      nombrePrograma: this.getControl('nombrePrograma').value,
      codigoPrograma: this.getControl('codigoPrograma').value,
      descripcionPrograma: this.getControl('descripcionPrograma').value,
      idEstado: 1,
      totalHoras:this.getControl('totalHoras').value,
      etapaLectiva:this.getControl('etapaLectiva').value,
      etapaProductiva:this.getControl('etapaProductiva').value,
      creditosLectiva:this.getControl('creditosLectiva').value,
      creditosProductiva:this.getControl('creditosProductiva').value,
    }
  }

  reset() {
    this.programa = null;
    this.showModalProgramas = false;
  }

  agregar(){
    this.showModalProgramas = true;
    this.create.emit;
  }

  ngOnInit():void {
    this.traerPrograma();
    this.traerProyectoFormativo(Number);
    this.setPrograma();
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

  // agregar() {
  //   this.create.emit();
  // }
}
