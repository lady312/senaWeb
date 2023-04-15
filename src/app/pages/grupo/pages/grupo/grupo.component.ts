import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { GrupoModel } from '@models/grupo.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { GruposService } from '@services/grupo.service';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { UINotificationService } from '@services/uinotification.service';
@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent {

  public showModalGrupo = false;

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Output() create: EventEmitter<void> = new EventEmitter();

  grupo: GrupoModel = null;
  grupos: GrupoModel[] = [];
  tipoGrupo: TipoGrupoModel = null;


  constructor(
    private _uiNotificationService: UINotificationService,
    private _gruposService: GruposService,
    private _tipoGruposService: TipoGrupoService,

  ) { }

  ngOnInit(): void {
    this.getGrupo();
  }

  getGrupo() {
    this._gruposService.traerGrupos()
      .subscribe(grupos => {
        this.grupos = grupos;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarGrupo(grupoId: number) {
    this._gruposService.eliminarGrupo(grupoId).subscribe(() => {
      this.getGrupo();
    })
  }

  actualizarGrupo(grupo: GrupoModel) {
    this.grupo = grupo;
    this.showModalGrupo = true;
  }

  createGrupo() {
    this.grupo = null;
    this.showModalGrupo = true;
  }

  guardarGrupo(grupo: GrupoModel) {
    console.log(grupo)
    if (grupo.id) {
      this._gruposService.actualizarGrupo(grupo).subscribe(gr => {
        this.getGrupo();
        this.reset();
      });
    } else {
      this._gruposService.crearGrupo(grupo).subscribe(gr => {
        this.getGrupo();
        this.reset();
      })
    }
  }

  guardarTipoGrupo(tipoGrupo: TipoGrupoModel)
  {
    this._tipoGruposService.crearTipoGrupo(tipoGrupo).subscribe(gr => {
      this.tipoGrupos.push(gr);
      this.guardarTipoGrupo(this.grupo);
    })
    this.reset();
  }

  reset() {
    this.grupo = null;
    this.showModalGrupo = false;
  }

}
