import { Component } from '@angular/core';
import { FaseModel } from '@models/fase.model';
import { FaseService } from '@services/fase.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.component.html',
  styleUrls: ['./fase.component.scss']
})
export class FaseComponent {

  private showModalFase = false;

  fase: FaseModel = null;
  fases: FaseModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _faseService: FaseService
  ) { }

  ngOnInit(): void {
    this.getFase();
  }

  getFase() {
    this._faseService.traerFase()
      .subscribe(fase => {
        this.fases = fase;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarFase(faseId: number) {
    this._faseService.eliminarFase(faseId).subscribe(() => {
      this.getFase();
    })
  }

  actualizarFace(fase: FaseModel) {
    this.fase = fase;
    this.showModalFase = true;
  }

  createFase() {
    this.fase = null;
    this.showModalFase = true;
  }

  guardarFase(fase: FaseModel) {
    if (fase.id) {
      this._faseService.actualizarFase(fase).subscribe(fase => {
        this.getFase();
        this.reset();
      });
    } else {
      this._faseService.crear(fase).subscribe(fase => {
        this.getFase();
        this.reset();
      })
    }
  }

  reset() {
    this.fase = null;
    this.showModalFase = false;
  }
}
