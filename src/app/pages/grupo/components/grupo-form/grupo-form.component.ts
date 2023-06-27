import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DiaJornadaModel } from '@models/dia_jornada.model';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { JornadaModel } from '@models/jornada.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { ProgramaModel } from '@models/programa.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { TipoProgramaModel } from '@models/tipo-programa.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { UsuarioModel } from '@models/usuario.model';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { DiaModel } from '@models/dia.model';
import { DiaService } from '@services/dia.service';
import { AsignacionJornadaGrupoService } from '@services/asignacion-jornada-grupo.service';
import { AsignacionJornadaGrupoModel } from '@models/asignacion-jornada-grupo.model';
import { JornadaService } from '@services/jornada.service';
import { ProgramaService } from '@services/programa.service';
import { InfraestructuraService } from '@services/infraestructura.service';
import { NivelFormacionService } from '@services/nivel-formacion.service';
import { TipoFormacionService } from '@services/tipo-formacion.service';
import { EstadoGrupoService } from '@services/estado-grupo.service';
import { TipoOfertaService } from '@services/tipo-oferta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent implements OnInit {

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() programas: ProgramaModel[] = [];
  @Input() niveles: NivelFormacionModel[] = [];
  @Input() tipoFormaciones: TipoFormacionModel[] = [];
  @Input() estadoGrupos: EstadoGrupoModel[] = [];
  @Input() tipoOfertas: TipoOfertaModel[] = [];
  @Input() infraestructuras: InfraestructuraModel[] = [];
  @Input() estados: EstadoGrupoModel[] = [];

  @Input() grupo: GrupoModel;

  @Input() title: string;

  @Output() store = new EventEmitter<GrupoModel>();
  @Output() cancel = new EventEmitter<void>();

  horariosInfra: InfraestructuraModel[] = [];

  showFormHorario: boolean = false;
  showFormTipoG: boolean = false;

  formGrupo: UntypedFormGroup;
  idTipoGrupo: number = 0;
  idPrograma: number = 0;
  idNivel: number = 0;
  idTipoFormacion: number = 0;
  idEstado: number = 0;
  idTipoOferta: number = 0;



  jornadasGrupo: JornadaModel[] = [];
  jornadasInput: JornadaModel[] = [];
  @Input() jornadas: JornadaModel[] = [];
  allJornadas = false;
  public jornadasChecked: any[];


  constructor(
    private formBuilder: UntypedFormBuilder,
    private _tipoGrupoService: TipoGrupoService,
    private _uiNotificationService: UINotificationService,
    private _asignacionJornadaGrupoService: AsignacionJornadaGrupoService,
    private _jornadaService: JornadaService,
    private _programaService: ProgramaService,
    private _infraestructuraService: InfraestructuraService,
    private _nivelFormacionService: NivelFormacionService,
    private _tipoFormacionService: TipoFormacionService,
    private _estadoService: EstadoGrupoService,
    private _tipoOfertaService: TipoOfertaService,
    private _jornadasService: JornadaService,
    private _modalService: NgbModal, //Modal

  ) {
    this.grupo = {
      id: null,
      nombre: '',
      fechaInicialGrupo: new Date(),
      fechaFinalGrupo: new Date(),
      observacion: '',
      nombreJornada: '',
      idTipoGrupo: null,
      idPrograma: null,
      idNivel: null,
      idTipoFormacion: null,
      idEstado: null,
      idTipoOferta: null,
      infraestructuras: [],
      jornadas: []
    }
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.title != 'Añadir Grupo') {
      this.setGrupo();
      this.setIndexes(this.grupo);
      this.setLists(this.grupo);
      // // this.cargarJornadas();
      this.traercheckedJornadas();


      // this.traerTipoGrupos();
      // this.traerProgramas();
      // this.traerNivelesFormacion();
      // this.traerInfraestructuras();
      // this.traerTipoFormaciones();
      // this.traerEstados();
      // this.traerTipoOfertas();
      // this.traerJornadas();
      // this.setGrupo();
      // this.traercheckedJornadas();


    } else {
      this.grupo = {
        id: null,
        nombre: '',
        fechaInicialGrupo: new Date(),
        fechaFinalGrupo: new Date(),
        observacion: '',
        nombreJornada: '',
        idTipoGrupo: null,
        idPrograma: null,
        idNivel: null,
        idTipoFormacion: null,
        idEstado: null,
        idTipoOferta: null,
        infraestructuras: [],
        jornadas: []
      }
    }

  }

  get nombreGrupoField() {
    return this.formGrupo.get('nombreGrupo');
  }

  get fechaInicialField() {
    return this.formGrupo.get('fechaInicial');
  }

  get fechaFinalField() {
    return this.formGrupo.get('fechaFinal');
  }

  get observacionField() {
    return this.formGrupo.get('observacion');
  }

  get nombreJornadaField() {
    return this.formGrupo.get('nombreJornada');
  }

  get idTipoGrupoField() {
    return this.formGrupo.get('idTipoGrupo');
  }

  get idProgramaField() {
    return this.formGrupo.get('idPrograma');
  }

  get idNivelField() {
    return this.formGrupo.get('idNivel');
  }

  get idTipoFormacionField() {
    return this.formGrupo.get('idTipoFormacion');
  }

  get idEstadoField() {
    return this.formGrupo.get('idEstado');
  }

  get idTipoOfertaField() {
    return this.formGrupo.get('idTipoOferta');
  }

  get totalJornadasSeleccionadas() {
    return this.jornadasGrupo.filter((j) => j['checked']).length;
  }

  setGrupo() {
    this.formGrupo.patchValue({
      nombreGrupo: this.grupo.nombre,
      fechaInicial: this.grupo.fechaInicialGrupo,
      fechaFinal: this.grupo.fechaFinalGrupo,
      observacion: this.grupo.observacion,
      nombreJornada: this.grupo.nombreJornada,
      idPrograma: this.grupo.programa.nombrePrograma,
      // idNivel:this.grupo.nivel_formacion.nivel,
      // idTipoFormacion: this.grupo.tipo_formacion.nombreTipoFormacion,
      // idEstado:this.grupo.estado_grupo.nombreEstado,
      // idTipoOferta:this.grupo.tipo_oferta.nombreOferta,
      // idTipoGrupo:this.grupo.tipo_grupo.nombreTipoGrupo,
      idTipoGrupo: this.grupo.idTipoGrupo,
      tipogrupo: this.grupo.tipo_grupo,

      // idPrograma: this.grupo.idPrograma,
      // programa: this.grupo.programa,

      // idInfraestructura: this.grupo.idInfraestructura,
      // infraestructura: this.grupo.infraestructura,

      idNivel: this.grupo.idNivel,
      nivel: this.grupo.nivel_formacion,

      idTipoFormacion: this.grupo.idTipoFormacion,
      tipoFormacion: this.grupo.tipo_formacion,

      idEstado: this.grupo.idEstado,
      estado: this.grupo.estado_grupo,

      idTipoOferta: this.grupo.idTipoOferta,
      tipoOferta: this.grupo.tipo_oferta,
    });
  }


  traerTipoGrupos() {
    this._tipoGrupoService.traerTipoGrupos().subscribe(
      (tipoGrupo: TipoGrupoModel[]) => {
        this.tipoGrupos = tipoGrupo;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerProgramas() {
    this._programaService.traerProgramas().subscribe(
      (programa: ProgramaModel[]) => {
        this.programas = programa;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
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

  traerNivelesFormacion() {
    this._nivelFormacionService.traerNivelesFormacion().subscribe(
      (niveles: NivelFormacionModel[]) => {
        this.niveles = niveles;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerTipoFormaciones() {
    this._tipoFormacionService.traerTipoFormaciones().subscribe(
      (tiposF: TipoFormacionModel[]) => {
        this.tipoFormaciones = tiposF;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerEstados() {
    this._estadoService.traerEstadoGrupos().subscribe(
      (estado: EstadoGrupoModel[]) => {
        this.estados = estado;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerTipoOfertas() {
    this._tipoOfertaService.traerTipoOfertas().subscribe(
      (tipoOferta: TipoOfertaModel[]) => {
        this.tipoOfertas = tipoOferta;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  traerJornadas() {
    this._jornadasService.traerJornada().subscribe(
      (jorn: JornadaModel[]) => {
        this.jornadas = jorn;
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  setIndexes(grupo: GrupoModel) {
    this.idTipoGrupo = grupo.idTipoGrupo;
    this.idPrograma = grupo.idPrograma;
    this.idNivel = grupo.idNivel;
    this.idTipoFormacion = grupo.idTipoFormacion;
    this.idEstado = grupo.idEstado;
    this.idTipoOferta = grupo.idTipoOferta;
  }

  selectIdTipoGrupo(event: any) {
    const value: string = event.target.value;
    const tipoPrograma: TipoGrupoModel = this.tipoGrupos.find((tipoP) =>
      tipoP.nombreTipoGrupo.toLocaleLowerCase() === value.toLocaleLowerCase());
    this.idTipoGrupo = tipoPrograma.id;
  }

  // selectIdPrograma(event: any) {
  //   const value: string = event.target.value;
  //   const programa: ProgramaModel = this.programas.find((programa) =>
  //     programa.nombrePrograma.toLocaleLowerCase() === value.toLocaleLowerCase());
  //   this.idPrograma = programa.id;
  // }

  selectIdPrograma(event: any) {
    const value: string = event.target.value;
    const programa: ProgramaModel = this.programas.find((programa) =>
      programa.nombrePrograma.toLocaleLowerCase() === value.toLocaleLowerCase());

    if (programa) {
      // El programa existe en la lista
      this.idPrograma = programa.id;
    } else {
      this._uiNotificationService.error('Por favor seleccione un programa existente');
    }
  }


  selectIdNivel(event: any) {
    const value: string = event.target.value;
    const nivel = this.niveles.find((nivel) =>
      nivel.nivel.toLocaleLowerCase() === value.toLocaleLowerCase());
    this.idNivel = nivel.id;
  }

  selectIdTipoFormacion(event: any) {
    const value: string = event.target.value;
    const tipoFormacion = this.tipoFormaciones.find((tFormacion) =>
      tFormacion.nombreTipoFormacion.toLocaleLowerCase() === value.toLocaleLowerCase());
    this.idTipoFormacion = tipoFormacion.id;
  }

  selectIdEstado(event: any) {
    const value: string = event.target.value;
    const estado = this.estadoGrupos.find((estado) =>
      estado.nombreEstado.toLocaleLowerCase() === value.toLocaleLowerCase());
    this.idEstado = estado.id;
  }

  selectIdTipoOferta(event: any) {
    const value: string = event.target.value;
    const tipoOferta = this.tipoOfertas.find((tOfertas) =>
      tOfertas.nombreOferta.toLocaleLowerCase() === value.toLocaleLowerCase());
    this.idTipoOferta = tipoOferta.id;
    console.log(this.idTipoOferta)
  }

  public jornadaChecked: any[];

  setLists(grupo: GrupoModel) {
    this.horariosInfra = grupo.infraestructuras;
  }



  addJornada(jornada: JornadaModel) {
    this.jornadasGrupo.push(jornada);
  }

  removeJornada(idJornada: number) {
    this.jornadasGrupo = this.jornadasGrupo.filter((jornada) => {
      jornada.id !== idJornada;
    });
  }

  addInfraestructura(infr: InfraestructuraModel) {
    this.showFormHorario = false;
    this.horariosInfra.push(infr);
  }

  removeInfraestructura(idInfr: number) {
    const index = this.horariosInfra.findIndex((infr) => infr.id === idInfr);
    this.horariosInfra.splice(index, 1);
  }

  private buildForm() {
    this.formGrupo = this.formBuilder.group({
      id: [null],
      nombreGrupo: ['', Validators.required],
      fechaInicial: ['', Validators.required],
      fechaFinal: ['', Validators.required],
      observacion: [''],
      nombreJornada: ['', Validators.required],
      idTipoGrupo: ['', Validators.required],
      idPrograma: ['', Validators.required],
      idNivel: ['', Validators.required],
      idTipoFormacion: ['', Validators.required],
      idEstado: ['', Validators.required],
      idTipoOferta: ['', Validators.required]
    });
    this.formGrupo.valueChanges
      .pipe(
        debounceTime(350)
      ).subscribe((data) => { });
  }

  closeModal() {
    this.cancel.emit();
  }

  guardarGrupo() {
    const grupo = this.getGrupo();
    this.store.emit(grupo);
  }

  private getControl(control: string) {

    const controlField = this.formGrupo.controls[control];
    return controlField;

  }

  getGrupo(): GrupoModel {

    // const jornadasGrupo: AsignacionJornadaGrupoModel[] = this.jornadasGrupo
    //   .filter((j) => j['checked'])
    //   .map((j) => {
    //     return {
    //       idJornada: j.id,
    //     };
    //   });

    const jornadasGrupo: AsignacionJornadaGrupoModel[] = this.jornadas
      .filter((j) => j["checked"])
      .map((j) => {
        return {
          idJornada: j.id,
        };
      });

    console.log(jornadasGrupo);

    return {
      id: this.grupo?.id,
      nombre: this.getControl('nombreGrupo').value,
      fechaInicialGrupo: this.getControl('fechaInicial').value,
      fechaFinalGrupo: this.getControl('fechaFinal').value,
      observacion: this.getControl('observacion').value,


      // idTipoGrupo: this.idTipoGrupo,
      // idPrograma: this.idPrograma,
      // idNivel: this.idNivel,
      // idTipoFormacion: this.idTipoFormacion,
      // idEstado: this.idEstado,
      // idTipoOferta: this.idTipoOferta,


      idTipoGrupo: this.getControl("idTipoGrupo").value,
      idPrograma: this.idPrograma,
      // idPrograma: this.getControl("idPrograma").value,
      idNivel: this.getControl("idNivel").value,
      idTipoFormacion: this.getControl("idTipoFormacion").value,
      idEstado: this.getControl("idEstado").value,
      idTipoOferta: this.getControl("idTipoOferta").value,


      infraestructuras: this.horariosInfra,
      jornadas: jornadasGrupo,

    }
  }

  agregarHorarioInfraestructura() {
    this.showFormHorario = true;
  }

  cancelarHorarioInfraestructura() {
    this.showFormHorario = false;
  }

  agregarTipoGrupo() {
    this.showFormTipoG = true;
  }


  cancelarTipoGrupo() {
    this.showFormTipoG = false;
  }

  onChange(jornada: JornadaModel, isChecked: boolean, pos: number) {
    if (isChecked) {
      this.jornadasInput.push(jornada);
    }
    else {
      this.jornadasInput.splice(pos, 1);
    }
  }

  cargarJornadas() {
    this._jornadaService.traerJornada().subscribe(
      (dias) => {
        this.jornadasGrupo = dias;
      },
      (error) => {
        this._uiNotificationService.error('Error de conexión');
      }
    );
  }

  //jornadas

  changeJornada(checked: boolean, index: number) {
    this.jornadas[index]["checked"] = checked;
    this.allJornadas = this.totalJornadasSeleccionadas === 3;
  }

  // get totalJornadasSeleccionadas() {
  //   return this.jornadas.filter((j) => j["checked"]).length;
  // }
  changeAllJornadas(allJor: boolean) {
    this.allJornadas = allJor;
    if (allJor) {
      this.jornadas.map((jor) => {
        jor["checked"] = true;
        return jor;
      });
    } else {
      this.jornadas.map((jor) => {
        jor["checked"] = false;
        return jor;
      });
    }
  }

  traercheckedJornadas() {
    this.jornadasChecked = [];
    this._asignacionJornadaGrupoService.getGrupoJornadaByGrupo(this.grupo.id).subscribe(
      (savedData: any) => {
        console.log(savedData);
        if (savedData && savedData.length > 0) {
          this.jornadasChecked = savedData;
          this.jornadas = this.jornadas.map((jorSe) => {
            jorSe.checked =
              this.jornadasChecked.findIndex(
                (j) => j.idJornada === jorSe.id
              ) !== -1;
            return jorSe;
          });
        } else {
          this.jornadas.forEach((jorSe) => {
            jorSe.checked = false;
          });
        }
      },
      (error) => {
        console.log("There was an error while retrieving data !!!", error);
      }
    );
  }

  guardarTipoGrupo(tipoGrupo: TipoGrupoModel) {
    this._tipoGrupoService.crearTipoGrupo(tipoGrupo).subscribe((tipo) => {
      this.tipoGrupos.push(tipo);
      this._uiNotificationService.success(
        "Tipo de grupo agregado",
        "Tipo grupo"
      );
      this.showFormTipoG = false;
    });
  }

}
