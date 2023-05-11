import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { ProgramaModel } from '@models/programa.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { UsuarioModel } from '@models/usuario.model';
import { GruposService } from '@services/grupo.service';
import { InfraestructuraService } from '@services/infraestructura.service';
import { ProgramaService } from '@services/programa.service';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { UINotificationService } from '@services/uinotification.service';
import { UsuarioService } from '@services/usuario.service';
import { AsignacionJornadaGrupoModel } from '@models/asignacion-jornada-grupo.model';
import { JornadaModel } from '@models/jornada.model';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent {

  public showModalGrupo = false;

  @Input() tipoGrupos: TipoGrupoModel[] = [];
  @Input() programas: ProgramaModel[] = [];
  @Input() usuarios: UsuarioModel[] = [];
  @Input() lideres: UsuarioModel[] = [];
  @Input() infraestructuras: InfraestructuraModel[] = [];
  @Input() nivelesFormacion: NivelFormacionModel[] = [];
  @Input() tipoFormaciones: TipoFormacionModel[] = [];
  @Input() estados: EstadoGrupoModel[] = [];
  @Input() tipoOfertas: TipoOfertaModel[] = [];
  @Input() jornadas: JornadaModel[] = [];

  jornadasGrupo: AsignacionJornadaGrupoModel[] = [];



  @Output() create: EventEmitter<void> = new EventEmitter();

  usuario: UsuarioModel = null;
  grupo: GrupoModel = null;
  grupos: GrupoModel[] = [];
  tipoGrupo: TipoGrupoModel = null;
  lider: UsuarioModel = null;
  programa: ProgramaModel = null;
  infraestructura: InfraestructuraModel = null;
  nivel: NivelFormacionModel = null;
  tipoFormacion: TipoFormacionModel = null;
  estado: EstadoGrupoModel = null;
  tipoOferta: TipoOfertaModel = null;
  jornada: JornadaModel = null;

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
        this.grupos.forEach((grupo) => {
        });
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
      this._gruposService.crearGrupo(grupo).subscribe(
        gr => {
          this.getGrupo();
          this.reset();
          this._uiNotificationService.success("El registro fué creado");
        },
        (error) => {
          this._uiNotificationService.error("Error al guardar la información");
        }
      );
    }
  }

  guardarTipoGrupo(tipoGrupo: TipoGrupoModel) {
    this._tipoGruposService.crearTipoGrupo(tipoGrupo).subscribe(gr => {
      this.tipoGrupos.push(gr);
      this.guardarTipoGrupo(this.grupo);
    })
    this.reset();
  }

  reset() {
    this.grupo = null;
    this.jornadasGrupo = [];
    this.showModalGrupo = false;
  }

}
