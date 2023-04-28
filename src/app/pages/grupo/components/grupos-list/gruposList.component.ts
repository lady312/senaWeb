import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GrupoModel } from '@models/grupo.model';
import { TipoGrupoModel } from '@models/tipogrupo.model';
import { GruposService } from '@services/grupo.service';
import { TipoGrupoService } from '@services/tipo-grupo.service';
import { ActivatedRoute } from '@angular/router';
import { UINotificationService } from '@services/uinotification.service';
import { Router } from '@angular/router';
import { NivelFormacionModel } from '@models/nivel-formacion.model';

@Component({
  selector: 'app-grupos-list',
  templateUrl: './gruposList.component.html',
  styleUrls: ['./gruposList.component.scss'],
  providers: [GruposService, TipoGrupoService]
})
export class GruposListComponent {

  obtenergrupo: any;
  grupo: GrupoModel;
  tiposGrupo: TipoGrupoModel[] = [];
  nivel: NivelFormacionModel[] = [];

  private _filters = {};
  selectedRow: any;
  gruposSearch: any[] = [];
  queryInput = '';
  gruposFiltrados: any[] = [];
  query: string;

  @Input()  grupos: GrupoModel[] = [];
  @Output() update: EventEmitter<GrupoModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor(
    private grupoService: GruposService,
    private route: ActivatedRoute,
    private _uiNotificationService: UINotificationService,
    private router: Router
  ) { }

  mostrarDatosGrupo(grupoId: number) {
    this.create.emit();
    this.router.navigate(['/grupo', grupoId]);
  }

  obtenerGrupo() {
    // Obtener el id del grupo desde la ruta activa
    const grupoId = +this.route.snapshot.paramMap.get('id');

    // Llamar a la función getGrupo() con el id obtenido
    this.grupoService.getGrupo(grupoId).subscribe(
      (data) => {
        this.obtenergrupo = data;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  obtenerNombreTipoGrupo(): string {
    if (this.grupo && this.grupo.idTipoGrupo) {
      const tipoGrupo = this.tiposGrupo.find(t => t.id === this.grupo.idTipoGrupo);
      return tipoGrupo ? tipoGrupo.nombreTipoGrupo : 'Desconocido';
    } else {
      return 'Desconocido';
    }
  }

  
  obtenerNivelFormativo(): string {
    if (this.grupo && this.grupo.idNivel) {
      const nivel = this.nivel.find(t => t.id === this.grupo.idNivel);
      return nivel ? nivel.nivel : 'Desconocido';
    } else {
      return 'Desconocido';
    }
  }

  enviarNumeroRegistros(event:any) {
    const num:number = event.target.value
    this.numReg = num;
  }

  actualizar(tipoGrupo: GrupoModel) {
    this.update.emit(tipoGrupo);
  }

  eliminar(idGrupo: number) {
    this.delete.emit(idGrupo);
  }

  agregar() {
    this.create.emit();
  }

  seleccionarFila(fila: any) {
    this.selectedRow = fila;
  }

  filter() {
    if (this.query && this.query.trim() !== '') {
      this.gruposFiltrados = this.grupos.filter((grupo) =>
        grupo.nombre.toLowerCase().includes(this.query.toLowerCase())
      );
    } else {
      this.gruposFiltrados = this.grupos.slice(); // Se copian todos los elementos del arreglo "procesos"
    }
  }

  search() {
    this.queryInput = this.query;
    this.grupoService.searchGrupos(this.query).subscribe((data: any[]) => {
      if (data && data.length > 0) {
        this.gruposSearch = data;
      } else {
        this._uiNotificationService.error('Datos no encontrados');
        this.gruposSearch = data;
      }
    });
  }

}
