import { Component, OnInit } from '@angular/core';
import { ActividadAprendizajeModel } from '@models/actividad-aprendizaje.model';
import { ActividadAprendizajeService } from '@services/actividad-aprendizaje.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-actividad-aprendizaje',
  templateUrl: './actividad-aprendizaje.component.html',
  styleUrls: ['./actividad-aprendizaje.component.scss']
})
export class ActividadAprendizajeComponent implements OnInit {

  private showModalAA = false;

  actividadAprendizaje: ActividadAprendizajeModel = null;
  actividadAprendizajes: ActividadAprendizajeModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _AaService: ActividadAprendizajeService
  ) { }

  ngOnInit(): void {
    this.getActividadAprendizaje();
  }

  getActividadAprendizaje() {
    this._AaService.traerActividadAprendizaje()
      .subscribe(actividadAprendizajes => {
        this.actividadAprendizajes = actividadAprendizajes;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  elminarActividadAprendizaje(AaId: number) {
    this._AaService.eliminarActividadAprendizaje(AaId).subscribe(() => {
      this.getActividadAprendizaje();
    })
  }

  actualizarActividadAprendizaje(Aa: ActividadAprendizajeModel) {
    this.actividadAprendizaje = Aa;
    this.showModalAA = true;
  }

  createActividadAprendizaje() {
    this.actividadAprendizaje = null;
    this.showModalAA = true;
  }

  guardarActividadAprendizaje(Aa: ActividadAprendizajeModel) {
    if (Aa.id) {
      this._AaService.actualizarActividadAprendizaje(Aa).subscribe(rol => {
        this.getActividadAprendizaje();
        this.reset();
      });
    } else {
      this._AaService.crearActividadAprendizaje(Aa).subscribe(rol => {
        this.getActividadAprendizaje();
        this.reset();
      })
    }
  }

  reset() {
    this.actividadAprendizaje = null;
    this.showModalAA = false;
  }

}
