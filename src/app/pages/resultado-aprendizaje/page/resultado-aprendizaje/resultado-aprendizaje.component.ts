import { Component, OnInit } from '@angular/core';
import { ResultadoAprendizajeModel } from '@models/resultado-aprendizaje.model';
import { ResultadoAprendizajeService } from '@services/resultado-aprendizaje.service';
import { UINotificationService } from '@services/uinotification.service';


@Component({
  selector: 'app-resultado-aprendizaje',
  templateUrl: './resultado-aprendizaje.component.html',
  styleUrls: ['./resultado-aprendizaje.component.scss']
})
export class ResultadoAprendizajeComponent {

  private showModalRap = false;

  rap: ResultadoAprendizajeModel = null;
  raps: ResultadoAprendizajeModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _RapService: ResultadoAprendizajeService
  ) { }

  ngOnInit(): void {
    this.getraps();
  }

  getraps() {
    this._RapService.traerRap()
      .subscribe(raps => {
        this.raps = raps;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarRap(RapId: number) {
    this._RapService.eliminarRaps(RapId).subscribe(() => {
      this.getraps();
    })
  }

  actualizarRap(Rap: ResultadoAprendizajeModel) {
    this.rap = Rap;
    this.showModalRap = true;
  }

  createRap(){
    this.rap = null;
    this.showModalRap = true;
  }

  guardarRap(Rap: ResultadoAprendizajeModel) {
    if (Rap.id) {
      this._RapService.actualizarRaps(Rap).subscribe(Rap => {
        this.getraps();
        this.reset();
      });
    } else {
      this._RapService.crearRaps(Rap).subscribe(Rap => {
        this.getraps();
        this.reset();
      })
    }
  }

  reset() {
    this.rap = null;
    this.showModalRap = false;
  }

}
