import { Component,EventEmitter,Input,OnInit, Output } from '@angular/core';
import { ProgramaModel } from '@models/programa.model';
import { ProgramaService } from '@services/programa.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-gestion-programa',
  templateUrl: './gestion-programa.component.html',
  styleUrls: ['./gestion-programa.component.scss']
})
export class GestionProgramaComponent  implements OnInit{
  selectedProgram: ProgramaModel;
  selectedProgramId: number;

  @Input() programas: ProgramaModel[] = [];

  @Output() update: EventEmitter<ProgramaModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;

  constructor(
    private programaService: ProgramaService,
    private _uiNotificationService: UINotificationService
  ){

  }

  ngOnInit():void {
    this.traerPrograma();
  }
 
  traerPrograma() {
    this.programaService.traerProgramas()
      .subscribe((programa: ProgramaModel[]) => {
        this.programas = programa;
      }, error => {
        this._uiNotificationService.error('Error de conexión');
      });
  }


  capturarId(){
    this.selectedProgram = this.programas.find(program => program.id === this.selectedProgramId);
  }


  enviarNumeroRegistros(id: number) {
    this.numReg = id;
    console.log(id,'puto id');
  }

  agregar() {
    this.create.emit();
  }
}
