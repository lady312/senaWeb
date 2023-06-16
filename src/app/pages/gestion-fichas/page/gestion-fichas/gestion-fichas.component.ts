import { Component, OnInit } from '@angular/core';
import { AsignacionParticipantesService } from '@services/asignacion-participantes.service';

@Component({
  selector: 'app-gestion-fichas',
  templateUrl: './gestion-fichas.component.html',
  styleUrls: ['./gestion-fichas.component.scss']
})
export class GestionFichasComponent implements OnInit {
  programas: any[];
  grupos: any[];
  aprendices: any[];

  busquedaPrograma: string;
  busquedaGrupo: string;
  busquedaAprendiz: string;

  programasFiltrados: any[];
  gruposFiltrados: any[];
  aprendicesFiltrados: any[];

  mostrarGrupos: boolean = true;
  mostrarAprendices: boolean = false; // Variable para controlar la visibilidad del buscador de aprendices

  constructor(private asignacionParticipanteService: AsignacionParticipantesService) {}

  ngOnInit() {
    this.obtenerProgramas();
    this.obtenerAprendicesActivos();
  }

  obtenerProgramas() {
    this.asignacionParticipanteService.obtenerProgramas().subscribe(
      programas => {
        this.programas = programas;
        this.programasFiltrados = programas;
      },
      error => console.log(error)
    );
  }

  obtenerGruposPorPrograma() {
    const programaSeleccionado = this.programas.find(programa => programa.nombrePrograma === this.busquedaPrograma);

    if (programaSeleccionado) {
      this.asignacionParticipanteService.obtenerGruposPorPrograma(programaSeleccionado.id).subscribe(
        grupos => {
          this.grupos = grupos;
          this.gruposFiltrados = grupos;
          this.busquedaGrupo = ''; // Limpiar la búsqueda de grupos cuando se selecciona un programa
          this.filtrarAprendicesPorGrupo(); // Filtrar los aprendices automáticamente
          this.mostrarGrupos = this.gruposFiltrados && this.gruposFiltrados.length > 0;
          this.mostrarAprendices = false; // Ocultar el buscador de aprendices al seleccionar un programa
        },
        error => console.log(error)
      );
    } else {
      this.grupos = [];
      this.gruposFiltrados = [];
      this.busquedaGrupo = '';
      this.aprendicesFiltrados = [];
      this.mostrarGrupos = false;
      this.mostrarAprendices = false;
    }
  }

  obtenerAprendicesActivos() {
    this.asignacionParticipanteService.obtenerAprendicesActivos().subscribe(
      aprendices => {
        this.aprendices = aprendices;
        this.aprendicesFiltrados = aprendices;
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
      this.programasFiltrados = this.programas;
    }
  }

  filtrarGrupos() {
    if (this.busquedaGrupo) {
      this.gruposFiltrados = this.grupos.filter(grupo =>
        grupo.nombre.toLowerCase().includes(this.busquedaGrupo.toLowerCase())
      );
    } else {
      this.gruposFiltrados = this.grupos;
    }
    this.filtrarAprendicesPorGrupo(); // Filtrar los aprendices automáticamente al cambiar la búsqueda de grupos

    // Verificar si se encontraron grupos filtrados
    this.mostrarGrupos = this.gruposFiltrados.length > 0;
    this.mostrarAprendices = false; // Ocultar el buscador de aprendices al filtrar los grupos
  }

  filtrarAprendicesPorGrupo() {
    if (this.busquedaGrupo) {
      const grupoSeleccionado = this.grupos.find(grupo => grupo.nombre === this.busquedaGrupo);
      if (grupoSeleccionado) {
        this.asignacionParticipanteService.obtenerAprendicesPorGrupo(grupoSeleccionado.id).subscribe(
          aprendices => {
            this.aprendicesFiltrados = aprendices;
            this.filtrarAprendizPorIdentificacion(); // Filtro para identificación
            this.mostrarAprendices = true; // Mostrar el buscador de aprendices cuando se encuentra un grupo
          },
          error => console.log(error)
        );
      } else {
        this.aprendicesFiltrados = [];
        this.mostrarAprendices = false; // Ocultar el buscador de aprendices cuando no se encuentra un grupo
      }
    } else {
      this.aprendicesFiltrados = [];
      this.mostrarAprendices = false; // Ocultar el buscador de aprendices cuando no se ha seleccionado un grupo
    }
  }

  filtrarAprendizPorIdentificacion() {
    if (this.busquedaAprendiz) {
      this.aprendicesFiltrados = this.aprendicesFiltrados.filter(aprendiz =>
        aprendiz.usuario.persona.identificacion.toLowerCase().includes(this.busquedaAprendiz.toLowerCase())
      );
    }
  }
}
