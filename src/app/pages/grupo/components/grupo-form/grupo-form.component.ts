import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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
  @Input() jornadas: JornadaModel[] = [];
  @Input() infraestructuras: InfraestructuraModel[] = [];

  @Input() grupo: GrupoModel;

  @Input() title: string;

  @Output() store = new EventEmitter<GrupoModel>();
  @Output() cancel = new EventEmitter<void>();

  jornadasGrupo: JornadaModel[] = [];
  horariosInfra: InfraestructuraModel[] = [];

  showFormHorario: boolean = false;
  showFormTipoG: boolean = false;
  allJornadas: boolean = false;

  formGrupo: UntypedFormGroup;
  idTipoGrupo: number = 0;
  idPrograma: number = 0;
  idNivel: number = 0;
  idTipoFormacion: number = 0;
  idEstado: number = 0;
  idTipoOferta: number = 0;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _tipoGrupoService: TipoGrupoService,
    private _uiNotificationService: UINotificationService
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
    return this.jornadas.filter((j) => j["checked"]).length;
  }

  setGrupo() {
    this.formGrupo.patchValue({
      nombreGrupo: this.grupo.nombre,
      fechaInicial: this.grupo.fechaInicialGrupo,
      fechaFinal: this.grupo.fechaFinalGrupo,
      observacion: this.grupo.observacion,
      nombreJornada: this.grupo.nombreJornada,
      idPrograma: this.grupo.programa.nombrePrograma,
      idNivel:this.grupo.nivel_formacion.nivel,
      idTipoFormacion: this.grupo.tipo_formacion.nombreTipoFormacion,
      idEstado:this.grupo.estado_grupo.nombreEstado,
      idTipoOferta:this.grupo.tipo_oferta.nombreOferta,
      idTipoGrupo:this.grupo.tipo_grupo.nombreTipoGrupo
    });
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

  selectIdPrograma(event: any) {
    const value: string = event.target.value;
    const programa: ProgramaModel = this.programas.find((programa) =>
      programa.nombrePrograma.toLocaleLowerCase() === value.toLocaleLowerCase());
    this.idPrograma = programa.id;
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

  setLists(grupo: GrupoModel) {
    this.jornadasGrupo = grupo.jornadas.map((jornadaGrupo) => {
      const index = this.jornadas.findIndex((jornada) => jornada == jornadaGrupo);
      this.changeJornada(true, index + 1);
      jornadaGrupo.jornada_grupo = { idJornada: jornadaGrupo.id };
      return jornadaGrupo;
    });
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

  getGrupo() {
    return {
      id: this.grupo?.id,
      nombre: this.getControl('nombreGrupo').value,
      fechaInicialGrupo: this.getControl('fechaInicial').value,
      fechaFinalGrupo: this.getControl('fechaFinal').value,
      observacion: this.getControl('observacion').value,
      idTipoGrupo: this.idTipoGrupo,
      idPrograma: this.idPrograma,
      idNivel: this.idNivel,
      idTipoFormacion: this.idTipoFormacion,
      idEstado: this.idEstado,
      idTipoOferta: this.idTipoOferta,
      jornadas: this.jornadasGrupo,
      infraestructuras: this.horariosInfra
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

  changeAllJornadas(allJor: boolean) {
    this.allJornadas = allJor;
    if (this.allJornadas) {
      this.jornadasGrupo = this.jornadas.map((jor) => {
        jor.jornada_grupo = { idJornada: jor.id };
        jor["checked"] = true;
        return jor;
      });
    } else {
      this.jornadasGrupo=this.jornadas.map((jor) => {
        jor["checked"] = false;
        if( jor["checked"]){
          return jor;
        }
      });
    }
  }
  changeJornada(checked: boolean, index: number) {
    if (index < 0) {
      return;
    }
    this.jornadas[index]["checked"] = checked;
    this.allJornadas = this.totalJornadasSeleccionadas === 3;
    if (this.jornadas[index]['checked']) {
      let newJornada = this.jornadas[index];
      newJornada.jornada_grupo = { idJornada: newJornada.id }
      this.jornadasGrupo.push(newJornada);
    } else {
      const deleteIndex = this.jornadasGrupo.findIndex((jornada) => jornada === this.jornadas[index]);
      this.jornadasGrupo.splice(deleteIndex, 1);
    }
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
