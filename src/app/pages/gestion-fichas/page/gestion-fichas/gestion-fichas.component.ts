// gestion-fichas.component.ts
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

  constructor(private asignacionParticipanteService: AsignacionParticipantesService) {}

  ngOnInit() {
    this.obtenerProgramas();
    this.obtenerAprendicesActivos();
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
    const programaSeleccionado = this.programas.find(programa => programa.nombrePrograma === this.busquedaPrograma);

    if (programaSeleccionado) {
      this.asignacionParticipanteService.obtenerGruposPorPrograma(programaSeleccionado.id)
        .subscribe(
          grupos => {
            this.grupos = grupos;
            this.gruposFiltrados = grupos;
            this.busquedaGrupo = ''; // Limpiar la búsqueda de grupos cuando se selecciona un programa
            this.filtrarAprendicesPorGrupo(); // Filtrar los aprendices automáticamente
          },
          error => console.log(error)
        );
    } else {
      this.grupos = [];
      this.gruposFiltrados = [];
      this.busquedaGrupo = '';
      this.aprendicesFiltrados = [];
    }
  }

  obtenerAprendicesActivos() {
    this.asignacionParticipanteService.obtenerAprendicesActivos()
      .subscribe(
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
  }

  filtrarAprendicesPorGrupo() {
    if (this.busquedaGrupo) {
      const grupoSeleccionado = this.grupos.find(grupo => grupo.nombre === this.busquedaGrupo);
      if (grupoSeleccionado) {
        this.asignacionParticipanteService.obtenerAprendicesPorGrupo(grupoSeleccionado.id)
          .subscribe(
            aprendices => {
              this.aprendicesFiltrados = aprendices;
              console.log(this.aprendicesFiltrados)
            },
            error => console.log(error)
          );
      } else {
        this.aprendicesFiltrados = [];
    
      }
    } else {
      this.aprendicesFiltrados = [];
    }
  }
}
