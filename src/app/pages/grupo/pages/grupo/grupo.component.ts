import { Component, OnInit } from '@angular/core';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { GrupoModel } from '@models/grupo.model';
import { InfraestructuraModel } from '@models/infraestructura.model';
import { JornadaModel } from '@models/jornada.model';
import { NivelFormacionModel } from '@models/nivel-formacion.model';
import { ProgramaModel } from '@models/programa.model';
import { TipoFormacionModel } from '@models/tipo-formacion.model';
import { TipoOfertaModel } from '@models/tipo-oferta.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { EstadoGrupoService } from '@services/estado-grupo.service';
import { GruposService } from '@services/grupo.service';
import { InfraestructuraService } from '@services/infraestructura.service';
import { JornadaService } from '@services/jornada.service';
import { NivelFormacionService } from '@services/nivel-formacion.service';
import { ProgramaService } from '@services/programa.service';
import { TipoFormacionService } from '@services/tipo-formacion.service';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { TipoOfertaService } from '@services/tipo-oferta.service';
import { UINotificationService } from '@services/uinotification.service';
import { UsuarioService } from '@services/usuario.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent implements OnInit {

  //cambian el estado del formulario para crear y actualizar
  protected showFormGrupo: boolean = false;
  protected formTitle: string;

  //datos de grupos
  grupos: GrupoModel[] = [];
  grupo: GrupoModel = null;

  /**
   * datos pasados a los modales hijos
   * estos almacenan todos los datos para que
   * al cargar el formulario o otro componente hijo
   * no haga mas solicitudes al backend
   */
  tipoGrupos: TipoGrupoModel[] = [];
  programas: ProgramaModel[] = [];
  nivelFormaciones: NivelFormacionModel[] = [];
  tipoFormaciones: TipoFormacionModel[] = [];
  estadoGrupos: EstadoGrupoModel[] = [];
  tipoOfertas: TipoOfertaModel[] = [];
  infraestructuras: InfraestructuraModel[] = [];
  jornadas: JornadaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _grupoService: GruposService,
    private _tipoGrupoService: TipoGrupoService,
    private _programaService: ProgramaService,
    private _nivelFormacionService: NivelFormacionService,
    private _tipoFormacionService: TipoFormacionService,
    private _estadoGrupoService: EstadoGrupoService,
    private _tipoOfertaService: TipoOfertaService,
    private _infraestructuraService: InfraestructuraService,
    private _jornadaService: JornadaService
  ) { }

  ngOnInit(): void {
    this.getGrupos();
    this.getTipoGrupos();
    this.getProgramas();
    this.getNivelesFormacion();
    this.getTipoFormacion();
    this.getEstadoGrupos();
    this.getTipoOfertas();
    this.getInfraestructuras();
    this.getJornadas();
  }

  getGrupos() {
    this._grupoService.traerGrupos().subscribe((grupos) => {
      this.grupos = grupos;
    }, (error) => {
      this._uiNotificationService.error('Error al cargar grupos');
    });
  }

  getTipoGrupos() {
    this._tipoGrupoService.traerTipoGrupos().subscribe((tGrupos) => {
      this.tipoGrupos = tGrupos;
    });
  }

  getProgramas() {
    this._programaService.traerProgramas().subscribe((programas) => {
      this.programas = programas;
    });
  }

  getNivelesFormacion() {
    this._nivelFormacionService.traerNivelesFormacion().subscribe((nivsFormacion) => {
      this.nivelFormaciones = nivsFormacion;
    });
  }

  getTipoFormacion() {
    this._tipoFormacionService.traerTipoFormaciones().subscribe((tFormaciones) => {
      this.tipoFormaciones = tFormaciones;
    });
  }

  getEstadoGrupos() {
    this._estadoGrupoService.traerEstadoGrupos().subscribe((eGrupos) => {
      this.estadoGrupos = eGrupos;
    });
  }

  getTipoOfertas() {
    this._tipoOfertaService.traerTipoOfertas().subscribe((tOfertas) => {
      this.tipoOfertas = tOfertas;
    });
  }

  getInfraestructuras() {
    this._infraestructuraService.traerInfraestructuras().subscribe((infrs) => {
      this.infraestructuras = infrs;
    });
  }

  getJornadas() {
    this._jornadaService.traerJornada().subscribe((jornadas) => {
      this.jornadas = jornadas;
    });
  }

  guardarGrupo(event: GrupoModel) {
    if (event.id) {
      this._grupoService.actualizarGrupo(event).subscribe(() => {
        this.getGrupos();
        this.reset();
      },(error) => {
        this._uiNotificationService.error(error.error.error);
      });
    } else {
      this._grupoService.crearGrupo(event).subscribe(() => {
        this.getGrupos();
        this.reset();
      },
      (error) => {
        this._uiNotificationService.error(error.error.error);
      });
    }
  }

  crearGrupo() {
    this.showFormGrupo = true;
    this.formTitle = 'Añadir Grupo';
  }

  actualizarGrupo(event: GrupoModel) {
    this.showFormGrupo = true;
    this.grupo = event;
    this.formTitle = 'Actualizar Grupo';
  }

  eliminarGrupo(grupoId: number) {
    this._grupoService.eliminarGrupo(grupoId).subscribe(() => {
      this.getGrupos();
    });
  }

  reset() {
    this.showFormGrupo = false;
    this.formTitle = '';
    this.grupo = null;
  }

}
