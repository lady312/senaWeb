import { Component } from '@angular/core';
import { AsignacionParticipantesService } from '@services/asignacion-participantes.service';

@Component({
  selector: 'app-gestion-fichas',
  templateUrl: './gestion-fichas.component.html',
  styleUrls: ['./gestion-fichas.component.scss']
})
export class GestionFichasComponent {
  programas: any[];
  grupos: any[];
  programaSeleccionadoId: number;
  grupoSeleccionadoId: number;

  busquedaPrograma: string;
  busquedaGrupo: string;
  programasFiltrados: any[];
  gruposFiltrados: any[];

  constructor(private asignacionParticipanteService: AsignacionParticipantesService) {}

  ngOnInit() {
    this.obtenerProgramas();
  }

  obtenerProgramas() {
    this.asignacionParticipanteService.obtenerProgramas()
      .subscribe(
        programas => {
          this.programas = programas;
          this.programasFiltrados = programas;
        },
        error => console.log(error)
      );
  }

  obtenerGruposPorPrograma() {
    this.asignacionParticipanteService.obtenerGruposPorPrograma(this.obtenerIdProgramaSeleccionado())
      .subscribe(
        grupos => {
          this.grupos = grupos;
          this.gruposFiltrados = grupos;
          console.log(this.grupos); // Verificar los datos en la consola
        },
        error => console.log(error)
      );
  }

  filtrarProgramas() {
    if (this.busquedaPrograma) {
      this.programasFiltrados = this.programas.filter(programa =>
        programa.nombrePrograma.toLowerCase().includes(this.busquedaPrograma.toLowerCase())
      );
    } else {
      this.programasFiltrados = this.programas; // Mostrar todos los programas si no hay término de búsqueda
    }
  }

  filtrarGrupos() {
    if (this.busquedaGrupo) {
      this.gruposFiltrados = this.grupos.filter(grupo =>
        grupo.nombre.toLowerCase().includes(this.busquedaGrupo.toLowerCase())
      );
    } else {
      this.gruposFiltrados = this.grupos; // Mostrar todos los grupos si no hay término de búsqueda
    }
  }

  obtenerIdProgramaSeleccionado(): number {
    const programaSeleccionado = this.programas.find(programa => programa.nombrePrograma === this.busquedaPrograma);
    return programaSeleccionado ? programaSeleccionado.id : null;
  }

  obtenerIdGrupoSeleccionado(): number {
    const grupoSeleccionado = this.grupos.find(grupo => grupo.nombre === this.busquedaGrupo);
    return grupoSeleccionado ? grupoSeleccionado.id : null;
  }

  seleccionarPrograma(programa: any) {
    this.programaSeleccionadoId = programa.id;
    this.obtenerGruposPorPrograma();
  }
}
