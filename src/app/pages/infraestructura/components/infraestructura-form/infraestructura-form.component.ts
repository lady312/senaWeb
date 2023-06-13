import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AreaModel } from '@models/area.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { SedeModel } from '@models/sede.model';
import { debounceTime } from 'rxjs/operators';
import * as QRCode from 'qrcode';
import { Key } from 'protractor';

@Component({
  selector: 'app-infraestructura-form',
  templateUrl: './infraestructura-form.component.html',
  styleUrls: ['./infraestructura-form.component.scss']
})
export class InfraestructuraFormComponent implements OnInit {

  @Input() areas: AreaModel[] = [];
  @Input() sedes: SedeModel[] = [];
  @Input() title: string;
  @Input() infraestructura:InfraestructuraModel=null;

  @Output() store = new EventEmitter<InfraestructuraModel>();
  @Output() cancel = new EventEmitter<void>();

  formInfra: UntypedFormGroup;
  idSede: number = 0;
  idArea: number = 0;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
    this.infraestructura = {
      id: null,
      nombreInfraestructura: '',
      capacidad: 0,
      descripcion: '',
      idSede: null,
      idArea: null
    }
    this.buildForm();
  }

  ngOnInit(): void {
    if(this.title!=='Añadir infraestructura'){
      this.setInfraestructura();
      this.setIndexes(this.infraestructura);
    }else{
      this.infraestructura={
        id:null,
        nombreInfraestructura:'',
        capacidad:null,
        idSede:null,
        idArea:null,
        descripcion:''
      }
    }
  }

  get nombreInfraField() {
    return this.formInfra.get('nombreInfraestructura');
  }
  get capacidadField() {
    return this.formInfra.get('capacidad');
  }
  get descripcionField() {
    return this.formInfra.get('descripcion');
  }
  get idSedeField() {
    return this.formInfra.get('idSede');
  }
  get idAreaField() {
    return this.formInfra.get('idArea');
  }

  setInfraestructura() {
    if (this.infraestructura) {
      this.formInfra.patchValue({
        nombreInfraestructura: this.infraestructura.nombreInfraestructura,
        capacidad: this.infraestructura.capacidad,
        descripcion: this.infraestructura.descripcion,
        idSede: this.infraestructura.sede.nombreSede ? this.infraestructura.sede.nombreSede : null,
      });
      if (this.infraestructura.area) {
        this.formInfra.patchValue({
          idArea: this.infraestructura.area.nombreArea ? this.infraestructura.area.nombreArea : null
        });
      }
    }
  }
  setIndexes(infr: InfraestructuraModel) {
    if (infr) {
      this.idSede = infr.idSede;
      if (infr.area) {
        this.idArea = infr.idArea;
      }
    }
  }
  selectIdSede(event: any) {
    const value = event.target.value;
    const sede = this.sedes.find(sede =>
      sede.nombreSede.toLowerCase() === value.toLowerCase());
    if (sede) {
      this.idSede = sede.id;
    }
  }
  selectIdArea(event: any) {
    const value = event.target.value;
    const area = this.areas.find(area =>
      area.nombreArea.toLowerCase() === value.toLowerCase());
    if(area){
      this.idArea = area.id;
    }
  }
  private buildForm() {
    this.formInfra = this.formBuilder.group({
      id: [0],
      nombreInfraestructura: new FormControl('', [Validators.required]),
      capacidad: new FormControl('', [Validators.required, Validators.min(1)]),
      descripcion: [''],
      idSede: ['', Validators.required,this.inSedesValidator()],
      idArea: ['', Validators.required,this.inSAreasValidator()]
    });
    this.formInfra.valueChanges
      .pipe(
        debounceTime(350)
      ).subscribe(data => {
      });
  }

  closeModal() {
    this.cancel.emit();
  }
  async guardarInfraestructura() {
    let infr = this.getInfraestructura();
    //espera hasta que el codigo qr sea creado
    infr.newQr = await this.generarQR();
    this.store.emit(infr);
  }

  private getControl(control: string) {
    return this.formInfra.controls[control];
  }

  getInfraestructura(): InfraestructuraModel {
    return {
      id: this.infraestructura?.id,
      nombreInfraestructura: this.getControl('nombreInfraestructura').value.trim(),
      capacidad: this.getControl('capacidad').value,
      descripcion: this.getControl('descripcion').value,
      idSede: this.idSede,
      idArea: this.idArea,
    }
  }


  //generar el codigo qr
  async generarQR(): Promise<string> {
    //trae los datos de la infraestructura
    let infrData = this.getInfraestructura();
    delete infrData.newQr;//elimina un dato inecesario de un objeto
    /**
     * convierte los datos del objeto infr en un string
     * para guardarlo dentro del codigo qr
     */
    const QrData = JSON.stringify(infrData);

    //configuracion del codigo creado
    const qrCodeOptions = {
      errorCorrectionLevel: 'H',
      margin: 1,
      scale: 8,
      width: 256,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }

    //crear canvas en memoria
    const canvas = document.createElement('canvas');
    //dibuja el codigo qr en el canvas
    await QRCode.toCanvas(canvas, QrData, qrCodeOptions);
    //Convertir la imagen en codigo base64
    const base64Image = canvas.toDataURL('image/png');
    //retorna un string con la imagen
    return base64Image;

  }

  onNumberInput(event: KeyboardEvent): void {
    const forbiddenKeys: string[] = ['-', '+', 'e', ',', '.'];

    if (forbiddenKeys.includes(event.key) || this.isArrowKey(event)) {
      event.preventDefault();
    }
  }

  isArrowKey(event: KeyboardEvent): boolean {
    const arrowKeys: string[] = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    return arrowKeys.includes(event.key);
  }

  inSedesValidator() {
    return async (control: FormControl) => {
      const value = control.value;
      const isValid = await this.sedes.some((sede) =>
        sede.nombreSede.toLowerCase() == value.toLowerCase());
      return isValid ? null : { inArray:true};
    }
  }

  inSAreasValidator() {
    return async (control: FormControl) => {
      const value = control.value;
      const isValid = await this.areas.some((area) =>
        area.nombreArea.toLowerCase() == value.toLowerCase());
      return isValid ? null : { inArray:true};
    }
  }
}
