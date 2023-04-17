import { Component, EventEmitter,OnInit, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AreaModel } from '@models/area.model';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {

  @Input() area:AreaModel;
  @Input() title:string;

  @Output() store = new EventEmitter<AreaModel>();
  @Output() cancel = new EventEmitter<void>();

  formArea: UntypedFormGroup;

  constructor(
    private formBuilder:UntypedFormBuilder
  ){

    this.area={
      id:null,
      nombreArea:'',
      codigo:''
    };

    this.buildForm();

  }

  ngOnInit():void{
    this.setArea();
  }

  get nombreAreaField(){
    return this.formArea.get('nombreArea');
  }
  get codigoField(){
    return this.formArea.get('codigo');
  }

  setArea(){
    if(this.area){
      this.formArea.patchValue({
        nombreArea:this.area.nombreArea,
        codigo:this.area.codigo
      });
    }
  }

  private buildForm(){
    this.formArea = this.formBuilder.group({
      id: [0],
      nombreArea: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
    });

    this.formArea.valueChanges
    .pipe(
      debounceTime(350)
    ).subscribe(data=>{
    });
  }

  closeModal(){
    this.cancel.emit();
  }

  guardarArea(){
    this.store.emit(this.getArea());
  }

  private getControl(control: string){
    return this.formArea.controls[control];
  }

  getArea(): AreaModel{
    return {
      id: this.area?.id,
      nombreArea:this.getControl('nombreArea').value,
      codigo:this.getControl('codigo').value
    }
  }
}
