import { Component } from '@angular/core';
import { ActividadProyectoModel } from '@models/actividad-proyecto.model';
import { ActividadProyectoService } from '@services/actividad-proyecto.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-actividad-proyecto',
  templateUrl: './actividad-proyecto.component.html',
  styleUrls: ['./actividad-proyecto.component.scss']
})
export class ActividadProyectoComponent {

  private showModalActividad = false;

  actividadProyecto: ActividadProyectoModel = null;
  actividadProyectos: ActividadProyectoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _actividadProyectoService: ActividadProyectoService
  ) { }

  ngOnInit(): void {
    this.getActividadProyecto();
  }

  getActividadProyecto() {
    this._actividadProyectoService.traerActividadProyecto()
      .subscribe(actividadProyecto => {
        this.actividadProyectos = actividadProyecto;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarActividadProyecto(actividadId: number) {
    this._actividadProyectoService.eliminarActividadProyecto(actividadId).subscribe(() => {
      this.getActividadProyecto();
    })
  }

  actualizarActividadProyecto(actividadProyecto: ActividadProyectoModel) {
    this.actividadProyecto = actividadProyecto;
    this.showModalActividad = true;
  }

  createActividadProyecto() {
    this.actividadProyecto = null;
    this.showModalActividad = true;
  }

  guardarProgramas(actividadProyecto: ActividadProyectoModel) {
    if (actividadProyecto.id) {
      this._actividadProyectoService.actualizarActividadProyecto(actividadProyecto).subscribe(actividadProyecto => {
        this.getActividadProyecto();
        this.reset();
      });
    } else {
      this._actividadProyectoService.crearActividadProyecto(actividadProyecto).subscribe(actividadProyecto => {
        this.getActividadProyecto();
        this.reset();
      })
    }
  }

  reset() {
    this.actividadProyecto = null;
    this.showModalActividad = false;
  }
}
