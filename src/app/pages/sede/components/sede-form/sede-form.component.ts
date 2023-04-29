import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UntypedFormGroup,UntypedFormBuilder, Validators } from '@angular/forms';
import { CentroFormacionModel } from '@models/centro-formacion.model';
import { CiudadModel } from '@models/ciudad.model';
import { DepartamentoModel } from '@models/departamento.model';
import { SedeModel } from '@models/sede.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sede-form',
  templateUrl: './sede-form.component.html',
  styleUrls: ['./sede-form.component.scss']
})
export class SedeFormComponent implements OnInit{

  @Input() sede:SedeModel;
  @Input() ciudades: CiudadModel[]=[];
  @Input() centrosFormacion:CentroFormacionModel[]=[];
  @Input() title:string;

  @Output() store = new EventEmitter<SedeModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() depId = new EventEmitter<number>();

  formSede: UntypedFormGroup;
  idCiudad:number=0;
  idCentro:number=0;
  
  constructor(
    private formBuilder:UntypedFormBuilder
  ){
    this.sede={
      id:null,
      nombreSede:'',
      direccion:'',
      telefono:'',
      descripcion:'',
      idCiudad:null,
      idCentroFormacion:null
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.setSede();
    this.setIndexes(this.sede);
  }

  get nombreSedeField(){
    return this.formSede.get('nombreSede');
  }
  get direccionField(){
    return this.formSede.get('direccion');
  }
  get telefonoField(){
    return this.formSede.get('telefono');
  }
  get descripcionField(){
    return this.formSede.get('descripcion');
  }
  get idCiudadField(){
    return this.formSede.get('idCiudad');
  }
  get idCentroField(){
    return this.formSede.get('idCentroFormacion');
  }

  setSede(){
    if(this.sede){
      this.formSede.patchValue({
        nombreSede:this.sede.nombreSede,
        direccion:this.sede.direccion,
        telefono:this.sede.telefono,
        descripcion:this.sede.descripcion,
        idCiudad:this.sede.ciudad.descripcion ? this.sede.ciudad.descripcion:null,
        idCentroFormacion:this.sede.centro_formacion.nombreCentro ? this.sede.centro_formacion.nombreCentro:null,
      });
    }
  }
  setIndexes(sede:SedeModel){
    if(sede){
      this.idCiudad = sede.idCiudad;
      this.idCentro = sede.idCentroFormacion;
    }
  }
  selectIdCiudad(event:any){
    const value = event.target.value;
    const ciudad = this.ciudades.find(ciudad=>
      (ciudad.descripcion.toLowerCase()===value.toLowerCase()));
      this.idCiudad=ciudad.id;
  }
  selectIdCentro(event:any){
    const value = event.target.value;
    const centro = this.centrosFormacion.find(centro=>(
      centro.nombreCentro.toUpperCase()===value.toUpperCase()
    ));
    this.idCentro=centro.id;
  }
  private buildForm(){
    this.formSede = this.formBuilder.group({
      id:[0],
      nombreSede: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      descripcion: [''],
      idCiudad: ['',[Validators.required]],
      idCentroFormacion: ['',[Validators.required]]
    });

    this.formSede.valueChanges
    .pipe(
      debounceTime(350)
    ).subscribe(data=>{
    });
  }

  closeModal(){
    this.cancel.emit();
  }

  guardarSede(){
    this.store.emit(this.getSede());
  }

  private getControl(control: string){
    return this.formSede.controls[control];
  }

  getSede():SedeModel{
    return{
      id: this.sede?.id,
      nombreSede:this.getControl('nombreSede').value,
      direccion:this.getControl('direccion').value,
      telefono:this.getControl('telefono').value,
      descripcion:this.getControl('descripcion').value,
      idCiudad:this.idCiudad,
      idCentroFormacion:this.idCentro
    }
  }

}
