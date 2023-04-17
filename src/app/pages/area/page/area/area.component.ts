import { Component,OnInit } from '@angular/core';
import { AreaModel } from '@models/area.model';
import { AreaService } from '@services/area.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})

export class AreaComponent implements OnInit{

  protected showFormArea:boolean= false;
  protected formTitle:string;
  protected showResultadoBusqueda:boolean=false;
  protected resultadoBusqueda:AreaModel=null;

  area:AreaModel=null;
  areas:AreaModel[]=[];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _areaService: AreaService
  ){}

  ngOnInit():void{
    this.getAreas();
  }

  getAreas(){
    this._areaService.traerAreas().subscribe(areas=>{
      this.areas=areas;
    },error=>{
      this._uiNotificationService.error("Error de conexión");
    });
  }

  eliminarArea(event:number){
    this._areaService.borrarArea(event).subscribe(()=>{
      this.getAreas();
    })
  }

  actualizarArea(event: AreaModel){
    this.formTitle='Editar área';
    this.area=event;
    this.showFormArea=true;
  }

  crearArea(){
    this.showFormArea=true;
    this.formTitle='Añadir área';
  }

  guardarArea(event:AreaModel){
    if(event.id){
      this._areaService.actualizarArea(event).subscribe(()=>{
        this.getAreas();
        this.reset();
      });
    }else{
      this._areaService.guardarArea(event).subscribe(()=>{
        this.getAreas();
        this.reset();
      });
    }
  }
  buscarArea(event:AreaModel){
    this.showResultadoBusqueda=true;
    this.resultadoBusqueda=event;
  }
  closeBusqueda(){
    this.showResultadoBusqueda=false;
    this.resultadoBusqueda=null;
  }
  reset(){
    this.showFormArea=false;
    this.showResultadoBusqueda=false;
    this.resultadoBusqueda=null;
    this.formTitle='';
    this.area=null;
  }
}
