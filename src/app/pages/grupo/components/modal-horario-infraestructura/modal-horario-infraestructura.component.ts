import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { InfraestructuraService } from "@services/infraestructura.service";
import { UINotificationService } from "@services/uinotification.service";
import { debounceTime } from "rxjs/operators";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from "@angular/common";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { InfraestructuraModel } from "@models/infraestructura.model";
import { HorarioInfraestructuraGrupo } from "@models/horario-infraestructura-grupo.model";
import { HorarioInfraestructuraGrupoService } from "@services/horario-infraestructura-grupo.service";
import { HorarioInfraestructuraTemporal } from "@models/horario-infraestructura-temporal.model";
import { GrupoComponent } from "../../pages/grupo/grupo.component";
import { GruposComponent } from "../grupos/grupos.component";

@Component({
  selector: 'app-modal-horario-infraestructura',
  templateUrl: './modal-horario-infraestructura.component.html',
  styleUrls: ['./modal-horario-infraestructura.component.scss']
})
export class ModalHorarioInfraestructuraComponent {
  formHorarioInfraestructura: FormGroup;

  @ViewChild('fechaInicialInput', { static: false }) fechaInicialInput: ElementRef;
  @ViewChild('fechaFinalInput', { static: false }) fechaFinalInput: ElementRef;

  @ViewChild('infraestructuraSelect', { static: false, read: ElementRef })
  infraestructuraSelect: ElementRef;


  @Input() infraestructuras: InfraestructuraModel[] = [];

  @Input() horarioGrupoInfraestructura: HorarioInfraestructuraGrupo;

  @Input() horarioGrupoInfraestructuras: HorarioInfraestructuraGrupo[] = [];

  @Output() store: EventEmitter<HorarioInfraestructuraGrupo> = new EventEmitter();
  @Output() enviarDatosAPrimerModal: EventEmitter<any> = new EventEmitter<any>();

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  @Input() horarioInfraestructura: HorarioInfraestructuraGrupo;

  formHorarioInfra: UntypedFormGroup;


  constructor(
    // private formBuilder: UntypedFormBuilder, // construccion de form controles
    private datePipe: DatePipe, //Fecha
    private cdr: ChangeDetectorRef,
    private _infraestructuraService: InfraestructuraService,
    private _uiNotificationService: UINotificationService, //nofitificacion
    private _modalService: NgbModal, //Modal
    private formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    private primerModal: GruposComponent
  ) {
    this.horarioInfraestructura = {
      idInfraestructura: null,
      fechaInicial: null,
      fechaFinal: null
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.traerInfraestructuras();
  }

  traerInfraestructuras() {
    this._infraestructuraService.traerInfraestructuras().subscribe(
      (infraestructura: InfraestructuraModel[]) => {
        this.infraestructuras = infraestructura;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  get infraestructuraField() {
    return this.formHorarioInfra.get("idInfraestructura");
  }

  get fechaInicialHorarioField() {
    return this.formHorarioInfra.get("fechaInicial");
  }

  get fechaFinalHorarioField() {
    return this.formHorarioInfra.get("fechaFinal");
  }

  setGrupo() {
    if (this.horarioInfraestructura) {
      this.formHorarioInfra.patchValue({
        idInfraestructura: this.horarioInfraestructura.idInfraestructura,
        fechaInicial: this.horarioInfraestructura.fechaInicial,
        fechaFinal: this.horarioInfraestructura.fechaFinal,
      })
    }
  }

  private buildForm() {
    this.formHorarioInfra = this.formBuilder.group({
      idInfraestructura: [0],
      fechaInicial: ["", [Validators.required]],
      fechaFinal:   ["", [Validators.required]],
    });
    this.formHorarioInfra.valueChanges.pipe(debounceTime(350)).subscribe((data) => { });
  }

  enviarDatosAlPrimerModal() {
    const datos = this.getHorarioInfraestructura();
    console.log(datos)
    this.enviarDatosAPrimerModal.emit(datos);
    this.primerModal.recibirDatosDelSegundoModal(datos); // Llama al método del primer modal para enviar los datos
    this.closeModal();
  }

  closeModal() {
    this.cancel.emit();
  }

  obtenerIdInfraestructura(): number {
    const idInfraestructura = parseInt(this.infraestructuraSelect.nativeElement.value, 10);
    console.log('ID Infraestructura seleccionado:', idInfraestructura);
    return idInfraestructura;
  }

  public getControl(name: string){
    return this.formHorarioInfra.controls[name];
  }
  
  // getHorarioInfraestructura(): HorarioInfraestructuraTemporal {

  //   return {
  //     idInfraestructura: this.obtenerIdInfraestructura(),
  //     fechaInicial: this.getControl('fechaInicial').value,
  //     fechaFinal: this.getControl('fechaFinal').value,
  //   };
  // }

  

  // getHorarioInfraestructura(): HorarioInfraestructuraTemporal[] {
  //   const infraestructuraArray: HorarioInfraestructuraTemporal[] = [];

  //   const idInfraestructura = this.getControl('idInfraestructura').value;
  //   const fechaInicial = this.getControl('fechaInicial').value;
  //   const fechaFinal = this.getControl('fechaFinal').value;

  //   const horarioInfraestructura: HorarioInfraestructuraTemporal = {
  //     idInfraestructura: idInfraestructura,
  //     fechaInicial: fechaInicial,
  //     fechaFinal: fechaFinal,
  //   };

  //   infraestructuraArray.push(horarioInfraestructura);

  //   return infraestructuraArray;
  // }



  getHorarioInfraestructura(): HorarioInfraestructuraGrupo[] {

    const infraestructuraArray: HorarioInfraestructuraGrupo[] = [];
  
    const idInfraestructura = this.getControl('idInfraestructura').value;
    const fechaInicial      = this.getControl('fechaInicial').value;
    const fechaFinal        = this.getControl('fechaFinal').value;
  
    const horarioInfraestructura: HorarioInfraestructuraGrupo = {
      idInfraestructura: idInfraestructura,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal,
    };
  
    infraestructuraArray.push(horarioInfraestructura);
  
    return infraestructuraArray;
  }
  
  
  formatearFecha(fecha: Date): string {
    return this.datePipe.transform(fecha, 'yyyy-MM-dd');
  }

  obtenerFechaInicialValue(): Date {
    const fechaInicialValue = this.fechaInicialInput.nativeElement.value;
    const fechaInicial = new Date(fechaInicialValue);

    const fechaFormateada = this.formatearFecha(fechaInicial);

    console.log(fechaFormateada);

    const fechaInicialString = JSON.stringify(fechaInicial.toLocaleDateString());
    console.log(fechaInicialString); // '2023-05-07'


    return fechaInicial;
  }

  obtenerFechaFinalValue(): Date {
    const fechaFinalValue = this.fechaFinalInput.nativeElement.value;
    const fechaFinal = new Date(fechaFinalValue);

    const fechaFormateada = this.formatearFecha(fechaFinal);

    console.log(fechaFormateada);

    return fechaFinal;
  }

  validarFechas(): boolean {
    const fechaInicial = this.obtenerFechaInicialValue();
    const fechaFinal = this.obtenerFechaFinalValue();

    if (fechaFinal > fechaInicial) {
      return true;
    } else {
      this._uiNotificationService.error(
        "La fecha final no puede ser menor a fecha inicial 😊",
        "Fechas"
      );
      return false;
    }
  }

}
