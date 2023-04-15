import { Component } from '@angular/core';
import { CompetenciaModel } from '@models/competencia';
import { CompetenciaService } from '@services/competencia.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.scss']
})
export class CompetenciaComponent {

  private showModalCompetencia = false;

  competencia: CompetenciaModel = null;
  competencias: CompetenciaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _competenciaService: CompetenciaService
  ) { }

  ngOnInit(): void {
    this.getCompetencia();
  }

  getCompetencia() {
    this._competenciaService.traerCompetencia()
      .subscribe(competencia => {
        this.competencias = competencia;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarCompetencia(competenciaId: number) {
    this._competenciaService.eliminarCompetencia(competenciaId).subscribe(() => {
      this.getCompetencia();
    })
  }

  actualizarCompetencia(competencia: CompetenciaModel) {
    this.competencia = competencia;
    this.showModalCompetencia = true;
  }

  createCompetencia() {
    this.competencia = null;
    this.showModalCompetencia = true;
  }

  guardarCompetencia(competencia: CompetenciaModel) {
    if (competencia.id) {
      this._competenciaService.actualizarCompetencia(competencia).subscribe(rol => {
        this.getCompetencia();
        this.reset();
      });
    } else {
      this._competenciaService.crearCompetencia(competencia).subscribe(rol => {
        this.getCompetencia();
        this.reset();
      })
    }
  }

  reset() {
    this.competencia = null;
    this.showModalCompetencia= false;
  }


}
