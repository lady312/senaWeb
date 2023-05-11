import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoProgramaModel } from '@models/tipo-programa.model';
import { ProgramaModel } from '@models/programa.model';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime} from 'rxjs/operators'
import { TipoProgramaService } from '@services/tipo-programa.service';

@Component({
  selector: 'app-add-programa',
  templateUrl: './add-programa.component.html',
  styleUrls: ['./add-programa.component.scss']
})
export class AddProgramaComponent implements OnInit {

  @Input() tipoPrograma: TipoProgramaModel ;//actualizar
  @Input() tipoProgramas: TipoProgramaModel [] = [];
  @Input() programa: ProgramaModel;//actualizar
  @Output() store: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() formDocs: EventEmitter<FileList> = new EventEmitter<FileList>();

  // @Output() formDocs:EventEmitter <{[key:number]:{files:FileList; fechaVig: string};}> = new EventEmitter();
  filesRuta: FileList;
  formPrograma: UntypedFormGroup;
  formTipoProgramas: UntypedFormGroup;
  showModalTipoProgramas = false;
  TipoPrograma: TipoProgramaModel = null;
  idDocumento: number[];
 filesRutaDoc: {[key:number]: {files:FileList; fechaVig:string}} ={};
  selectedFile: File;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private TipoProgramaService: TipoProgramaService,
    private _uiNotificationService: UINotificationService,
    private _programaService: TipoProgramaService,
  ) {
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

    this.tipoPrograma = {
      id:null,
      nombreTipoPrograma:'',
      descripcion:''
    };
    this.idDocumento=[];
    this.buildForms();
  }

  // onFileSelected(event:any) {
  //   const file: File = event.target.files[0];
  //   const objectUrl: string = URL.createObjectURL(file);
  //   console.log('este es al archivo', objectUrl);
  // }
  onFileChangeDoc(files: FileList) {
    const file = files[0]; // Obtener solo el primer archivo seleccionado
    this.formDocs.emit(files); // Emitir el archivo
    console.log(file, 'dfd'); // Mostrar el archivo en la consola
  }
  
  // onFileChangeDoc(tipo: any, files: FileList){
  //   var nameDoc = [];

  //   var fechaVig = this.formPrograma.value.fechaVig;
  //   this.filesRutaDoc[tipo.id]= {files, fechaVig};
   
  //   this.formDocs.emit(this.filesRutaDoc);
  //   console.log(this.filesRutaDoc,'dfd')
  // }

  get nombreTipoProgramaField() {
    return this.formTipoProgramas.get('nombreTipoPrograma');
  }

  get descripcionField() {
    return this.formTipoProgramas.get('descripcion');
  }

  setTipoProgramas() {
    if (this.tipoPrograma) {
      this.formTipoProgramas.patchValue({
        nombreTipoPrograma: this.tipoPrograma.nombreTipoPrograma,
        descripcion: this.tipoPrograma.descripcion
      })
    }
  }

  private buildForms() {
    this.formTipoProgramas = this.formBuilder.group({
      id: [0],
      nombreTipoPrograma: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.formTipoProgramas.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarTipoProgramas(tipoPrograma: TipoProgramaModel) {

    this.TipoProgramaService.crearTipoPrograma(tipoPrograma).subscribe(tipoPrograma => {
      this.tipoProgramas.push(tipoPrograma);
      this.reset();
    });
  }

  closeModals() {
    this.cancel.emit();
  }

  private getControls(nombreTipoPrograma: string) {
    return this.formTipoProgramas.controls[nombreTipoPrograma];
  }

  getTipoProgramas(): TipoProgramaModel {
    return {
      id: this.tipoPrograma?.id,
      descripcion: this.getControls('descripcion').value,
      nombreTipoPrograma: this.getControls('nombreTipoPrograma').value
    }
  }

  reset() {
    this.TipoPrograma = null;
    this.showModalTipoProgramas = false;
  }

  agregar(){
    this.showModalTipoProgramas = true;
    this.create.emit;
  }
  
  // ----------------------------------------------------------------------------
  ngOnInit(): void {
    this.traerTipoPrograma();
    this.setPrograma();
  }

  traerTipoPrograma() {
    this.TipoProgramaService.traerTipoPrograma()
      .subscribe((tipo_programa: TipoProgramaModel[]) => {
        this.tipoProgramas = tipo_programa;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
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
        totalHoras:this.programa.totalHoras,
        etapaLectiva:this.programa.etapaLectiva,
        etapaProductiva:this.programa.etapaProductiva,
        creditosLectiva:this.programa.creditosLectiva,
        creditosProductiva:this.programa.creditosProductiva,
        // rutaArchivo: this.programa.rutaArchivo,
        
      })
    }
    console.log(this.programa,'asi llega al set');
  }

  private buildForm() {
    this.formPrograma = this.formBuilder.group({
      id: [0],
      nombrePrograma: ['', [Validators.required]],
      codigoPrograma: ['', [Validators.required]],
      descripcionPrograma: ['', [Validators.required]],
      idTipoPrograma: ['', [Validators.required]],
      totalHoras:['', [Validators.required]],
      etapaLectiva:['', [Validators.required]],
      etapaProductiva:['', [Validators.required]],
      creditosLectiva:['', [Validators.required]],
      creditosProductiva:['', [Validators.required]],
      rutaArchivo:['', [Validators.required]]
    });

    this.formPrograma.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  guardarPrograma() {
    this.store.emit(this.getPrograma());
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
      rutaArchivo:this.getControl('rutaArchivo').value
    }
  }
}
