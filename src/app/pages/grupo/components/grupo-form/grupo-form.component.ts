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
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { UsuarioModel } from '@models/usuario.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})
export class GrupoFormComponent implements OnInit {

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() instructores: UsuarioModel[] = [];
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

  jornadasGrupo:JornadaModel[] = [];
  horariosInfra:InfraestructuraModel[] = [];

  showFormHorario:boolean = false;

  formGrupo: UntypedFormGroup;
  idTipoGrupo: number = 0;
  idLider: number = 0;
  idPrograma: number = 0;
  idNivel: number = 0;
  idTipoFormacion: number = 0;
  idEstado: number = 0;
  idTipoOferta: number = 0;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    if (this.title !== 'Añadir grupo') {
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
        idLider: null,
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
  get idTipoGrupoField(){
    return this.formGrupo.get('idTipoGrupo');
  }
  get idLiderField(){
    return this.formGrupo.get('idLider');
  }
  get idProgramaField(){
    return this.formGrupo.get('idPrograma');
  }
  get idNivelField(){
    return this.formGrupo.get('idNivel');
  }
  get idTipoFormacionField(){
    return this.formGrupo.get('idTipoFormacion');
  }
  get idEstadoField(){
    return this.formGrupo.get('idEstado');
  }
  get idTipoOfertaField(){
    return this.formGrupo.get('idTipoOferta');
  }

  setGrupo(){
    this.formGrupo.patchValue({
      nombreGrupo:this.grupo.nombre,
      fechaInicial:this.grupo.fechaInicialGrupo,
      fechaFinal:this.grupo.fechaFinalGrupo,
      observacion:this.grupo.observacion,
      nombreJornada:this.grupo.nombreJornada
    });
  }

  setIndexes(grupo:GrupoModel){
    this.idTipoGrupo=grupo.idTipoGrupo;
    this.idLider=grupo.idLider;
    this.idPrograma=grupo.idPrograma;
    this.idNivel=grupo.idNivel;
    this.idTipoFormacion=grupo.idTipoFormacion;
    this.idEstado=grupo.idEstado;
    this.idTipoOferta=grupo.idTipoOferta;
  }
  selectIdTipoGrupo(event:any){
    const value = event.target.value;
    const tipoGrupo = this.tipoGrupos.find((tipoGrupo)=>{
      tipoGrupo.nombreTipoGrupo.toUpperCase()===value.toUpperCase();
    });
    this.idTipoGrupo=tipoGrupo.id;
  }
  selectIdLider(event:any){
    const value = event.target.value;
    const lider = this.instructores.find((instructor)=>{
      instructor.persona.apellido1.toUpperCase()===value.toUpperCase();
    });
    this.idLider=lider.id;
  }
  selectIdPrograma(event:any){
    const value = event.target.value;
    const programa = this.programas.find((programa)=>{
      programa.nombrePrograma.toUpperCase()===value.toUpperCase();
    });
    this.idPrograma=programa.id;
  }
  selectIdNivel(event:any){
    const value = event.target.value;
    const nivel = this.niveles.find((nivel)=>{
      nivel.nivel.toUpperCase()===value.toUpperCase();
    });
    this.idNivel=nivel.id;
  }
  selectIdTipoFormacion(event:any){
    const value = event.target.value;
    const tipoFormacion = this.tipoFormaciones.find((tFormaciones)=>{
      tFormaciones.nombreTipoFormacion.toUpperCase()===value.toUpperCase();
    });
    this.idTipoFormacion=tipoFormacion.id;
  }
  selectIdEstado(event:any){
    const value = event.target.value;
    const estado = this.estadoGrupos.find((estado)=>{
      estado.nombreEstado.toUpperCase()===value.toUpperCase();
    });
    this.idEstado=estado.id;
  }
  selectIdTipoOferta(event:any){
    const value = event.target.value;
    const tipoOferta = this.tipoOfertas.find((tOferta)=>{
      tOferta.nombreOferta.toUpperCase()===value.toUpperCase();
    });
    this.idTipoOferta=tipoOferta.id;
  }

  setLists(grupo:GrupoModel){
    this.jornadasGrupo=grupo.jornadas;
    this.horariosInfra=grupo.infraestructuras;
  }

  addJornada(jornada:JornadaModel){
    this.jornadasGrupo.push(jornada);
  }
  removeJornada(idJornada:number){
    this.jornadasGrupo= this.jornadasGrupo.filter((jornada)=>{
      jornada.id!==idJornada;
    });
  }

  addInfraestructura(infr:InfraestructuraModel){
    this.horariosInfra.push(infr);
  }
  removeInfraestructura(idInfr:number){
    this.horariosInfra = this.horariosInfra.filter((infr)=>{
      infr.id!==idInfr
    });
  }

  private buildForm(){
    this.formGrupo=this.formBuilder.group({
      id:[null],
      nombreGrupo:['',Validators.required],
      fechaInicial:['',Validators.required],
      fechaFinal:['',Validators.required],
      observacion:[''],
      nombreJornada:['',Validators.required],
      idTipoGrupo:['',Validators.required],
      idLider:['',Validators.required],
      idPrograma:['',Validators.required],
      idNivel:['',Validators.required],
      idTipoFormacion:['',Validators.required],
      idEstado:['',Validators.required],
      idTipoOferta:['',Validators.required]
    });
    this.formGrupo.valueChanges
    .pipe(
      debounceTime(350)
    ).subscribe((data)=>{});
  }

  closeModal(){
    this.cancel.emit();
  }
  guardarGrupo(){
    const grupo = this.getGrupo();
    this.store.emit(grupo);
  }
  private getControl(control:string){
    return this.formGrupo.controls[control];
  }
  getGrupo(){
    let grupo:GrupoModel = {
      id:this.grupo?.id,
      nombre:this.getControl('nombreGrupo').value,
      fechaInicialGrupo:this.getControl('fechaInicialGrupo').value,
      fechaFinalGrupo:this.getControl('fechaFinalGrupo').value,
      observacion:this.getControl('observacion').value,
      nombreJornada:this.getControl('nombreJornada').value,
      idTipoGrupo:this.idTipoGrupo,
      idLider:this.idLider,
      idPrograma:this.idPrograma,
      idNivel:this.idNivel,
      idTipoFormacion:this.idTipoFormacion,
      idEstado:this.idEstado,
      idTipoOferta:this.idTipoOferta,
      jornadas:this.jornadasGrupo,
      infraestructuras:this.horariosInfra
    }
    return grupo;
  }

  agregarHorarioInfraestructura(){
    this.showFormHorario=true;
  }
  cancelarHorarioInfraestructura(){
    this.showFormHorario=false;
  }
}
