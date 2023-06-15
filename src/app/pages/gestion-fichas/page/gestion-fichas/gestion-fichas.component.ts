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
          console.log(programas)
        },
        error => console.log(error)
      );
  }

  obtenerGruposPorPrograma() {
    // Obtener el programa seleccionado por el nombre
    const programaSeleccionado = this.programas.find(programa => programa.nombrePrograma === this.busquedaPrograma);

    if (programaSeleccionado) {
      this.asignacionParticipanteService.obtenerGruposPorPrograma(programaSeleccionado.id)
        .subscribe(
          grupos => {
            this.grupos = grupos;
            this.gruposFiltrados = grupos;
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
      this.busquedaAprendiz = '';
      this.aprendicesFiltrados = [];
    }
  }

  filtrarAprendicesPorGrupo() {
    if (this.busquedaGrupo) {
      this.aprendicesFiltrados = this.aprendices.filter(aprendiz =>
        aprendiz.grupo.id === +this.busquedaGrupo
      );
    } else {
      this.aprendicesFiltrados = [];
    }
  }
}
