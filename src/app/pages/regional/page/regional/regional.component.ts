import { Component, OnInit } from '@angular/core';
import { RegionalModel } from '@models/RegionalModel';
import { RegionalService } from '@services/regional.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-regional',
  templateUrl: './regional.component.html',
  styleUrls: ['./regional.component.scss']
})
export class RegionalComponent implements OnInit {

  private showModalRegional = false;

  regional: RegionalModel = null;
  regionales: RegionalModel[] = [];
 

  constructor(
    private _uiNotificationService: UINotificationService,
    private _regionalService: RegionalService
  ) { }


  ngOnInit(): void {
    this.getRegional();
  }

  getRegional() {
    this._regionalService.traerRegional()
      .subscribe(regional => {
        this.regionales = regional;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
      });
  }



  eliminarRegional(regionalId: number) {
    this._regionalService.eliminarRegional(regionalId).subscribe(() => {
      this.getRegional();
    })
  }
 
  actualizarRegional(regional: RegionalModel) {
    this.regional = regional;
    this.showModalRegional = true;
  }

  
  createRegional() {
    this.regional = null;
    this.showModalRegional = true;
  }


  guardarRegional(regional: RegionalModel) {
    if (regional.id) {
      this._regionalService.actualizarRegional(regional).subscribe(regional => {
        this.getRegional();
        this.reset();
      });
    } else {
      this._regionalService.crearRegional(regional).subscribe(regional => {
        this.getRegional();
        this.reset();
      })
    }
  }

  reset() {
    this.regional = null;
    this.showModalRegional = false;
  }

}



