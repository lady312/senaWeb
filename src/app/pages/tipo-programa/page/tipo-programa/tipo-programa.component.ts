import { Component, OnInit } from '@angular/core';
import { UINotificationService } from '@services/uinotification.service';
import { TipoProgramaService } from '@services/tipo-programa.service';
import { TipoProgramaModel } from '@models/tipo-programa.model';


@Component({
  selector: 'app-tipo-programa',
  templateUrl: './tipo-programa.component.html',
  styleUrls: ['./tipo-programa.component.scss']
})
export class TipoProgramaComponent implements OnInit {

  showModalTipoP = false;

  tipoP: TipoProgramaModel = null;
  tipoPs: TipoProgramaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _tipoPService: TipoProgramaService
  ) { }

  ngOnInit(): void {
    this.getTipoP();
  }

  getTipoP() {
    this._tipoPService.traerTipoPrograma()
      .subscribe(tipoP => {
        this.tipoPs = tipoP;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarTipoP(tipoPId: number) {
    this._tipoPService.eliminarTipoPrograma(tipoPId).subscribe(() => {
      this.getTipoP();
    })
  }

  actualizarTipoP(tipoP: TipoProgramaModel) {
    this._tipoPService.actualizarTipoPrograma(tipoP).subscribe(tipoP => {
      this.getTipoP();
      this.reset();
    });
  }

  guardarTipoP(tipoP: TipoProgramaModel) {
    if (tipoP.id) {
      this._tipoPService.actualizarTipoPrograma(tipoP).subscribe(tipoP => {
        this.getTipoP();
        this.reset();
      });
    } else {
      this._tipoPService.crearTipoPrograma(tipoP).subscribe(tipoP => {
        this.getTipoP();
        this.reset();
      })
    }
  }

  createTipoP() {
    this.tipoP = null;
    this.showModalTipoP = true;
  }

  reset() {
    this.tipoP = null;
    this.showModalTipoP = false;
  }
}
