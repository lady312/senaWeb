import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AreaModel } from '@models/area.model';
import { CiudadModel } from '@models/ciudad.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { SedeModel } from '@models/sede.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-infraestructura-form',
  templateUrl: './infraestructura-form.component.html',
  styleUrls: ['./infraestructura-form.component.scss']
})
export class InfraestructuraFormComponent implements OnInit{
  
  @Input() infraestructura:InfraestructuraModel;
  @Input() areas:AreaModel[]=[];
  @Input() ciudades:CiudadModel[]=[];
  @Input() sedes: SedeModel[]=[];
  @Input() title: string;

  @Output() store = new EventEmitter<InfraestructuraModel>();
  @Output() cancel = new EventEmitter<void>();
  @Output() ciudadId =new EventEmitter<number>();

  formInfra: UntypedFormGroup;

  constructor(
    private formBuilder:UntypedFormBuilder
  ){
    this.infraestructura={
      id:null,
      nombreInfraestructura:'',
      capacidad:0,
      descripcion:'',
      idSede:null,
      idArea:null
    }
    this.buildForm();
  }

  ngOnInit(): void {
    this.setInfraestructura();
    this.enviarIdCiudad(this.idCiudadField.value);
  }

  get nombreInfraField(){
    return this.formInfra.get('nombreInfraestructura');
  }
  get capacidadField(){
    return this.formInfra.get('capacidad');
  }
  get descripcionField(){
    return this.formInfra.get('descripcion');
  }
  get idCiudadField(){
    return this.formInfra.get('idCiudad');
  }
  get idSedeField(){
    return this.formInfra.get('idSede');
  }
  get idAreaField(){
    return this.formInfra.get('idArea');
  }

  setInfraestructura(){
    if (this.infraestructura) {
      this.formInfra.patchValue({
        nombreInfraestructura:this.infraestructura.nombreInfraestructura,
        capacidad:this.infraestructura.capacidad,
        descripcion: this.infraestructura.descripcion,
        idCiudad:this.infraestructura.sede.idCiudad ? this.infraestructura.sede.idCiudad:null,
        idSede:this.infraestructura.idSede ? this.infraestructura.idSede:null,
        idArea:this.infraestructura.idArea ? this.infraestructura.idArea:null
      });
    }
  }
  private buildForm(){
    this.formInfra=this.formBuilder.group({
      id:[0],
      nombreInfraestructura:['',Validators.required],
      capacidad:['',Validators.required],
      descripcion:['',Validators.required],
      idCiudad:[0,Validators.required],
      idSede:[0,Validators.required],
      idArea:[0,Validators.required]
    });
    this.formInfra.valueChanges
    .pipe(
      debounceTime(350)
    ).subscribe(data=>{
    });
  }

  closeModal(){
    this.cancel.emit();
  }
  guardarInfraestructura(){
    this.store.emit(this.getInfraestructura());
  }

  private getControl(control:string){
    return this.formInfra.controls[control];
  }

  getInfraestructura(): InfraestructuraModel{
    return {
      id:this.infraestructura?.id,
      nombreInfraestructura:this.getControl('nombreInfraestructura').value,
      capacidad:this.getControl('capacidad').value,
      descripcion:this.getControl('descripcion').value,
      idSede:this.getControl('idSede').value,
      idArea:this.getControl('idArea').value
    }
  }

  enviarIdCiudad(idCiudad:number){
    this.ciudadId.emit(idCiudad);
  }
  
}
