import { Component } from "@angular/core";
import { DiaJornadaModel } from "@models/dia_jornada.model";
import { JornadaModel } from "@models/jornada.model";
import { JornadaService } from "@services/jornada.service";
import { UINotificationService } from "@services/uinotification.service";

@Component({
  selector: "app-jornada",
  templateUrl: "./jornada.component.html",
  styleUrls: ["./jornada.component.scss"],
})
export class JornadaComponent {

  public showModalJornada = false;

  jornada: JornadaModel = null;
  jornadas: JornadaModel[] = [];
  diasjornada: DiaJornadaModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _jornadaService: JornadaService
  ) {}

  ngOnInit(): void {
    this.getJornada();
  }

  getJornada() {
    this._jornadaService.traerJornada().subscribe(
      (jornadas) => {
        this.jornadas = jornadas;
        this.jornadas.forEach((jornada) => {
        });
      },
      (error) => {
        this._uiNotificationService.error("Error de conexión");
      }
    );
  }

  eliminarJornada(jornadaId: number) {
    this._jornadaService.eliminarJornada(jornadaId).subscribe(() => {
      this.getJornada();
    });
  }

  actualizarJornada(jornada: JornadaModel) {
    this.jornada = jornada;
    this.showModalJornada = true;
  }

  createJornada() {
    this.jornada = null;
    this.showModalJornada = true;
  }

  guardarJornada(jornada: JornadaModel) {
    if (jornada.id) {
      this._jornadaService.actualizarJornada(jornada).subscribe(
        (jorn) => {
          this.getJornada();
          this.reset();
          this._uiNotificationService.success("Actualizado con exito");
        },
        (error) => {
          this._uiNotificationService.error(
            "Error al actualizar la información"
          );
        }
      );
    } else {
      this._jornadaService.crearJornada(jornada).subscribe(
        (jorn) => {
          this.getJornada();
          this.reset();
          this._uiNotificationService.success("Registro creado");
        },
        (error) => {
          this._uiNotificationService.error("Error al guardar la información");
        }
      );
    }
  }

  reset() {
    this.jornada = null;
    this.diasjornada = [];
    this.showModalJornada = false;
  }
}
