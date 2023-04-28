import { Component } from '@angular/core';
import { CentroFormacionService } from '@services/centro-formacion.service';
import { UINotificationService } from '@services/uinotification.service';
import { CentroFormacionModel } from '@models/centro-formacion.model';
@Component({
  selector: 'app-centro-formacion',
  templateUrl: './centro-formacion.component.html',
  styleUrls: ['./centro-formacion.component.scss']
})
export class CentroFormacionComponent {
  protected showModalCentro = false;

  centroFormacionModel: CentroFormacionModel = null;
  centroFormaciones: CentroFormacionModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _centroFormacionService: CentroFormacionService
  ) { }

  ngOnInit(): void {
    this.getCentroFormacion();
  }

  getCentroFormacion() {
    this._centroFormacionService.traerCentroFormacion()
      .subscribe(centroFormacion => {
        this.centroFormaciones = centroFormacion;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarCentroFormacion(actividadId: number) {
    this._centroFormacionService.eliminarCentroFormacion(actividadId).subscribe(() => {
      this.getCentroFormacion();
    })
  }

  actualizarCentroFormacion(centroFormacionModel: CentroFormacionModel) {
    this.centroFormacionModel = centroFormacionModel;
    this.showModalCentro = true;
  }

  createCentroFormacion() {
    this.centroFormacionModel = null;
    this.showModalCentro = true;
  }

  guardarCentros(centroFormacion: CentroFormacionModel) {
    if (centroFormacion.id) {
      this._centroFormacionService.actualizarCentroFormacion(centroFormacion).subscribe(centroFormacion => {
        this.getCentroFormacion();
        this.reset();
      });
    } else {
      this._centroFormacionService.crearCentroFormacion(centroFormacion).subscribe(centroFormacion => {
        this.getCentroFormacion();
        this.reset();
      })
    }
  }

  reset() {
    this.centroFormacionModel = null;
    this.showModalCentro = false;
  }
}
