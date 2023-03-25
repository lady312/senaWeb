import { Component, OnInit } from '@angular/core';
import { CompetenciaModel } from '@models/Competencia.model';
import { CompetenciaService } from '@services/competencia.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.scss']
})
export class CompetenciaComponent {

  private showModalRol = false;

  rol: CompetenciaModel = null;
  roles: CompetenciaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _rolService: CompetenciaService
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this._rolService.traerRol()
      .subscribe(roles => {
        this.roles = roles;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarRol(rolId: number) {
    this._rolService.eliminarCompetencia(rolId).subscribe(() => {
      this.getRoles();
    })
  }

  actualizarRol(rol: CompetenciaModel) {
    this.rol = rol;
    this.showModalRol = true;
  }

  createRol(){
    this.rol = null;
    this.showModalRol = true;
  }

  guardarRol(rol: CompetenciaModel) {
    if (rol.id) {
      this._rolService.actualizarCompetencia(rol).subscribe(rol => {
        this.getRoles();
        this.reset();
      });
    } else {
      this._rolService.crearCompetencia(rol).subscribe(rol => {
        this.getRoles();
        this.reset();
      })
    }
  }

  reset() {
    this.rol = null;
    this.showModalRol = false;
  }

}
