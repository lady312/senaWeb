import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { GrupoModel } from '@models/grupo.model';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss'],
  providers: [DatePipe]
})

export class GruposComponent implements OnInit {

  @ViewChild('fechaInicialInput', { static: false }) fechaInicialInput: ElementRef;
  @ViewChild('fechaFinalInput', { static: false }) fechaFinalInput: ElementRef;

  @Output() store:  EventEmitter<GrupoModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  public showModalTipoGrupo = false;
  tipoGrupo: TipoGrupoModel = null;
  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() grupo: GrupoModel;
  tipoGrupoForm: FormGroup;
  formGrupo: UntypedFormGroup;
  grupos: TipoGrupoModel[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder, // construccion de form controles
    private datePipe: DatePipe, //Fecha
    private cdr: ChangeDetectorRef,
    private _tipoGrupoService: TipoGrupoService, //Servicio TipoGrupo
    private _uiNotificationService: UINotificationService, //nofitificacion
    private _modalService: NgbModal, //Modal
    //Renderizar vista
  ) {
    this.grupo = {
      id: null,
      nombre: '',
      fechaInicial: null,
      fechaFinal: null,
      observacion: '',
      idTipoGrupo: null,
      tipogrupo: null,
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerTipoGrupos();
    this.setGrupo();
  }

  guardarTipoGrupo(tipoGrupo: TipoGrupoModel) {
      this._tipoGrupoService.crearTipoGrupo(tipoGrupo).subscribe(tipo => {
        this.tipoGrupos.push(tipo);
        this._uiNotificationService.success('Tipo de grupo agregado', 'Tipo grupo');
        this.reset();
    })
  }

  agregar() {
    this.showModalTipoGrupo = true;
    this.create.emit();
  }

  actualizarVista() {
    // Llamando a markForCheck() o detectChanges() para forzar una actualización del renderizado
    this.cdr.markForCheck(); // O this.cdr.detectChanges();
  }

  traerTipoGrupos() {
    this._tipoGrupoService.traerTipoGrupos()
      .subscribe((tipoGrupo: TipoGrupoModel[]) => {
        this.tipoGrupos = tipoGrupo;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }

  get nombreField() {
    return this.formGrupo.get('nombre');
  }

  get fechaInicialField() {
    return this.formGrupo.get('fechaInicial');
  }

  get fechaFinalField() {
    return this.formGrupo.get('fechaFinal');
  }

  get observacion() {
    return this.formGrupo.get('observacion');
  }

  get idTipoGrupo() {
    return this.formGrupo.get('idTipoGrupo');
  }

  setGrupo() {
    if (this.grupo) {
      this.formGrupo.patchValue({
        nombre: this.grupo.nombre,
        fechaInicial: this.grupo.fechaInicial,
        fechaFinal: this.grupo.fechaFinal,
        observacion: this.grupo.observacion,
        idTipoGrupo: this.grupo.idTipoGrupo,
        tipogrupo: this.grupo.tipogrupo,
      })
    }
  }

  private buildForm() {
    this.formGrupo = this.formBuilder.group({
      id: [0],
      nombre: ['', [Validators.required]],
      fechaInicial: ['', [Validators.required]],
      fechaFinal: ['', [Validators.required]],
      observacion: ['', [Validators.required]],
      idTipoGrupo: ['', [Validators.required]],
    });

    this.formGrupo.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarGrupo() {
    if (this.validarFechas()) {
      this.store.emit(this.getGrupo());
    }
  }

  closeModal() {
    this.cancel.emit();
  }

  public getControl(name: string) {
    return this.formGrupo.controls[name];
  }

  getGrupo(): GrupoModel {
    return {
      id: this.grupo?.id,
      nombre: this.getControl('nombre').value,
      fechaInicial: this.getControl('fechaInicial').value,
      fechaFinal: this.getControl('fechaFinal').value,
      observacion: this.getControl('observacion').value,
      idTipoGrupo: this.getControl('idTipoGrupo').value,
      // tipogrupo: this.getControl('tipogrupo').value,
    }
  }

  obtenerFechaInicialValue(): Date {
    const fechaInicialValue = this.fechaInicialInput.nativeElement.value;
    const fechaInicial = new Date(fechaInicialValue);
    return fechaInicial;
  }

  obtenerFechaFinalValue(): Date {
    const fechaFinalValue = this.fechaFinalInput.nativeElement.value;
    const fechaFinal = new Date(fechaFinalValue);
    return fechaFinal;
  }

  validarFechas(): boolean {
    const fechaInicial = this.obtenerFechaInicialValue();
    const fechaFinal = this.obtenerFechaFinalValue();

    if (fechaFinal > fechaInicial) {
      return true;
    } else {
      this._uiNotificationService.error('La fecha final no puede ser menor a fecha inicial 😊', 'Fechas')
      return false;
    }
  }

  reset() {
    this.tipoGrupo = null;
    this.showModalTipoGrupo = false;
  }

}
