import { Component } from '@angular/core';
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
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { UINotificationService } from '@services/uinotification.service';
import { UsuarioService } from '@services/usuario.service';
import { JornadaModel } from '@models/jornada.model';
import { JornadaService } from '@services/jornada.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss']
})
export class GrupoComponent {

  public showModalGrupo = false;

  infraestructuras:InfraestructuraModel[]=[];
  grupos: GrupoModel[] = [];
  jornadas:JornadaModel[]= [];
  tipoGrupos:TipoGrupoModel[]=[];
  instructores:UsuarioModel[]=[];
  estudiantes:UsuarioModel[]=[];
  
  usuario: UsuarioModel = null;
  grupo: GrupoModel = null;
  
  tipoGrupo: TipoGrupoModel = null;
  lider: UsuarioModel = null;
  programa: ProgramaModel = null;
  nivel: NivelFormacionModel = null;
  tipoFormacion: TipoFormacionModel = null;
  estado: EstadoGrupoModel = null;
  tipoOferta: TipoOfertaModel = null;
  jornada: JornadaModel = null;

  constructor(
    private _uiNotificationService: UINotificationService,
    private _gruposService: GruposService,
    private _tipoGruposService: TipoGrupoService,
    private _infraestructuraService:InfraestructuraService,
    private _jornadaService:JornadaService,
    private _usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    this.getGrupos();
    this.getInfraestructuras();
    this.getJornadas();
  }

  getGrupos() {
    this._gruposService.traerGrupos()
      .subscribe(grupos => {
        this.grupos = grupos;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  getInfraestructuras(){
    this._infraestructuraService.traerInfraestructuras().subscribe((infrs)=>{
      this.infraestructuras=infrs;
    },(error)=>{
      this._uiNotificationService.error('Error de coneccion','infraestructuras');
    })
  }

  getJornadas(){
    this._jornadaService.traerJornada().subscribe((jornada)=>{
      this.jornadas=jornada;
    },(error)=>{
      this._uiNotificationService.error('Error de conexión','Jornadas');
    })
  }

  eliminarGrupo(grupoId: number) {
    this._gruposService.eliminarGrupo(grupoId).subscribe(() => {
      this.getGrupos();
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
        this.getGrupos();
        this.reset();
        this._uiNotificationService.success("El registro fué actualizado");
      });
    } else {
      this._gruposService.crearGrupo(grupo).subscribe(
        gr => {
          this.getGrupos();
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
    this.jornadas = [];
    this.infraestructuras = [];
    this.showModalGrupo = false;
  }

}
