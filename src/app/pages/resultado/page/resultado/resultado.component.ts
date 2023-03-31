import { Component } from '@angular/core';
import { ResultadoModel } from '@models/resultado.model';
import { ResultadoService } from '@services/resultado.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent {

  private showModalResultado = false;

  resultado: ResultadoModel = null;
  resultados: ResultadoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _resultadoService: ResultadoService
  ) { }

  ngOnInit(): void {
    this.getResultado();
  }

  getResultado() {
    this._resultadoService.traerResultado()
      .subscribe(resultado => {
        this.resultados = resultado;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }

  eliminarResultado(resultadoId: number) {
    this._resultadoService.eliminarResultado(resultadoId).subscribe(() => {
      this.getResultado();
    })
  }

  actualizarResultado(resultado: ResultadoModel) {
    this.resultado = resultado;
    this.showModalResultado = true;
  }

  createResultado() {
    this.resultado = null;
    this.showModalResultado = true;
  }

  guardarResultado(resultado: ResultadoModel) {
    if (resultado.id) {
      this._resultadoService.actualizarResultado(resultado).subscribe(rol => {
        this.getResultado();
        this.reset();
      });
    } else {
      this._resultadoService.crearResultado(resultado).subscribe(rol => {
        this.getResultado();
        this.reset();
      })
    }
  }

  reset() {
    this.resultado = null;
    this.showModalResultado= false;
  }


}
