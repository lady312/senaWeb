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

  guardarProgramas(programa: ProgramaModel) {
    if (programa.id) {
      this._programaService.actualizarProgramas(programa).subscribe(programa => {
        this.getPrograma();
        this.reset();
      });
    } else {
      this._programaService.crearProgramas(programa).subscribe(programa => {
        this.getPrograma();
        this.reset();
      })
    }
  }

  reset() {
    this.programa = null;
    this.showModalPrograma = false;
  }
}
