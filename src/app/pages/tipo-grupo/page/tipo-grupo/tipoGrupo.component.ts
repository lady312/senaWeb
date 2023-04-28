import { Component, OnInit, Input} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-tipogrupo',
  templateUrl: './tipoGrupo.component.html',
  styleUrls: ['./tipoGrupo.component.scss']
})
export class TipogrupoComponent implements OnInit {

  public showModalTipoGrupo = false;

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  tipoGrupo: TipoGrupoModel = null;
  formGrupo: UntypedFormGroup;

  constructor(
    private _uiNotificationService: UINotificationService,
    private tipoGrupoService: TipoGrupoService
  ) { }

  ngOnInit(): void {
    this.getTipoGrupos();
  }

  getTipoGrupos() {
    this.tipoGrupoService.traerTipoGrupos()
      .subscribe(tipoGrupo => {
        this.tipoGrupos = tipoGrupo;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  guardarTipoGrupo(tipoGrupo: TipoGrupoModel) {
    if (tipoGrupo.id) {
      this.tipoGrupoService.actualizarTipoGrupo(tipoGrupo).subscribe(tipo => {
        this.getTipoGrupos();
        this.resetTipoGrupo();
      });
    } else {
      this.tipoGrupoService.crearTipoGrupo(tipoGrupo).subscribe(tipo => {
        this.getTipoGrupos();
        this.resetTipoGrupo();
      })
    }
  }

  eliminarTipoGrupo(tipoGrupoId: number) {
    this.tipoGrupoService.eliminarTipoGrupo(tipoGrupoId).subscribe(() => {
      this.getTipoGrupos();
    })
  }

  actualizarTipoGrupo(tipoGrupo: TipoGrupoModel) {
    this.tipoGrupo = tipoGrupo;
    this.showModalTipoGrupo = true;
  }

  createTipoGrupo() {
    this.tipoGrupo = null;
    this.showModalTipoGrupo = true;
  }

  resetTipoGrupo() {
    this.tipoGrupo = null;
    this.showModalTipoGrupo = false;
  }

}
