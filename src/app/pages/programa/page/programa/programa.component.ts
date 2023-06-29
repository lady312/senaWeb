import { Component } from '@angular/core';
import { ProgramaModel } from '@models/programa.model';
import { ProgramaService } from '@services/programa.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.scss']
})
export class ProgramaComponent {

  protected showModalPrograma = false;
  filesPrograma :FileList;
  programa: ProgramaModel = null;
  programas: ProgramaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _programaService: ProgramaService
  ) { }

  ngOnInit(): void {
    this.getPrograma();
  }

  getPrograma() {
    this._programaService.traerProgramas()
      .subscribe(programa => {
        this.programas = programa;
      }, error => {
      this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarProgramas(programaId: number) {
    this._programaService.eliminarProgramas(programaId).subscribe(() => {
      this.getPrograma();
    })
  }

  actualizarProgramas(programa: ProgramaModel) {
    this.programa = programa;
    this.showModalPrograma = true;
  }

  createProgramas() {
    this.programa = null;
    this.showModalPrograma = true;
  }

  guardarProgramas(programa: any) {
      const file = this.filesPrograma;
      const data = new FormData();
      data.append('archivo', file[0]);
      data.append('nombrePrograma', programa.nombrePrograma.toUpperCase());
      data.append('codigoPrograma', programa.codigoPrograma.toUpperCase());
      data.append('descripcionPrograma', programa.descripcionPrograma.toUpperCase());
      data.append('idTipoPrograma', programa.idTipoPrograma.toString());
      data.append('idEstado', programa.idEstado.toString());
      data.append('totalHoras', programa.totalHoras.toString());
      data.append('etapaLectiva', programa.etapaLectiva.toString());
      data.append('etapaProductiva', programa.etapaProductiva.toString());
      data.append('creditosLectiva', programa.creditosLectiva.toString());
      data.append('creditosProductiva', programa.creditosProductiva.toString());
  
      if (programa.id) {
        this._programaService.actualizarProgramas(data).subscribe((programa) => {
          this.getPrograma();
          this.reset();
          this.showModalPrograma=false;
        });
      } else {
        this._programaService.crearProgramas(data).subscribe((programa) => {
          this.getPrograma();
          this.reset();
          this.showModalPrograma=false;
        });
      }
      
  
  }
 
  reset() {
    this.programa = null;
    this.showModalPrograma = false;
  }
}
