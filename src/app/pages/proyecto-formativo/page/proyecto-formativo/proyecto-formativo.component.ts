import { Component } from '@angular/core';
import { ProyectoFormativoModel } from '@models/proyecto-formativo.model ';
import { ProyectoFormativoService } from '@services/proyecto-formativo.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-proyecto-formativo',
  templateUrl: './proyecto-formativo.component.html',
  styleUrls: ['./proyecto-formativo.component.scss']
})
export class ProyectoFormativoComponent {

  private showModalProyecto = false;

  proyecto: ProyectoFormativoModel = null;
  proyectos: ProyectoFormativoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _proyectoService: ProyectoFormativoService
  ) { }

  ngOnInit(): void {
    this.getProyecto();
  }

  getProyecto() {
    this._proyectoService.traerProyecto()
      .subscribe(proyecto => {
        this.proyectos = proyecto;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarProyecto(proyectoId: number) {
    this._proyectoService.eliminarProyecto(proyectoId).subscribe(() => {
      this.getProyecto();
    })
  }

  actualizarProyecto(proyecto: ProyectoFormativoModel) {
    this.proyecto = proyecto;
    this.showModalProyecto = true;
  }

  createProyecto() {
    this.proyecto = null;
    this.showModalProyecto = true;
  }

  guardarProyecto(proyecto: ProyectoFormativoModel) {
    if (proyecto.id) {
      this._proyectoService.actualizarProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
      });
    } else {
      this._proyectoService.crearProyecto(proyecto).subscribe(proyecto => {
        this.getProyecto();
        this.reset();
        console.log('llega asi',proyecto);
      })
    }
  }

  reset() {
    this.proyecto = null;
    this.showModalProyecto = false;
  }

}
