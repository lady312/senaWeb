import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { UntypedFormGroup,UntypedFormBuilder, Validators } from '@angular/forms';
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
  @Input() departamentos: DepartamentoModel[]=[];
  @Input() ciudades: CiudadModel[]=[];
  @Input() title:string;

  @Output() store = new EventEmitter<SedeModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() depId = new EventEmitter<number>();

  formSede: UntypedFormGroup;
  
  constructor(
    private formBuilder:UntypedFormBuilder
  ){
    this.sede={
      id:null,
      nombreSede:'',
      direccion:'',
      telefono:'',
      descripcion:'',
      idCiudad:null
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.setSede();
    this.enviarIdDep(this.idDepartamentoField.value);
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
    return this.formSede.get('idSede');
  }
  get idDepartamentoField(){
    return this.formSede.get('idDepartamento');
  }

  setSede(){
    if(this.sede){
      this.formSede.patchValue({
        nombreSede:this.sede.nombreSede,
        direccion:this.sede.direccion,
        telefono:this.sede.telefono,
        descripcion:this.sede.descripcion,
        idCiudad:this.sede.idCiudad ? this.sede.idCiudad:null,
        idDepartamento:this.sede.ciudad.idDepartamento ? this.sede.ciudad.idDepartamento:null
      });
    }
  }
  private buildForm(){
    this.formSede = this.formBuilder.group({
      id:[0],
      nombreSede: ['',[Validators.required]],
      direccion: ['',[Validators.required]],
      telefono: ['',[Validators.required]],
      descripcion: ['',[Validators.required]],
      idCiudad: [0,[Validators.required]],
      idDepartamento: [0,[Validators.required]]
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
      idCiudad:this.getControl('idCiudad').value
    }
  }

  enviarIdDep(idDep:number){
    this.depId.emit(idDep);
  }

}
