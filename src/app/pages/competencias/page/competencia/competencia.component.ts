import { Component, OnInit } from '@angular/core';
import { CompetenciaModel } from '@models/competencia.model';
import { CompetenciaService } from '@services/competencia.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-competencia',
  templateUrl: './competencia.component.html',
  styleUrls: ['./competencia.component.scss']
})
export class CompetenciaComponent {

  private showModalCompetencia = false; 

  competencias: CompetenciaModel = null;
  competencia: CompetenciaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _CompetenciaService: CompetenciaService
  ) { }

  ngOnInit(): void {
    this.getCompetencia();
  }

  getCompetencia() {
    this._CompetenciaService.traerCompetencias()
      .subscribe(competencia => {
        this.competencia = competencia;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarCompetencia(CompetenciaId: number) {
    this._CompetenciaService.eliminarCompetencia(CompetenciaId).subscribe(() => {
      this.getCompetencia();
    })
  }

  actualizarCompetencia(Competencia: CompetenciaModel) {
    this.competencias = Competencia;
    this.showModalCompetencia = true;
  }

  createCompetencia(){
    this.competencias = null;
    this.showModalCompetencia = true;
  }

  guardarCompetencia(Competencia: CompetenciaModel) {
    if (Competencia.id) {
      this._CompetenciaService.actualizarCompetencia(Competencia).subscribe(Competencia => {
        this.getCompetencia();
        this.reset();
      });
    } else {
      this._CompetenciaService.crearCompetencia(Competencia).subscribe(Competencia => {
        this.getCompetencia();
        this.reset();
      })
    }
  }

  reset() {
    this.competencias = null;
    this.showModalCompetencia = false;
  }

}
