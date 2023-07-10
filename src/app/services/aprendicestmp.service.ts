import { Injectable } from '@angular/core';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class AprendicestmpService {

  constructor(
    private _coreService: CoreService
  ) { }

  public cargarArchivo(file: File): Promise<any> {
    const formData: FormData = new FormData();
    formData.append('excelFile', file);

    return this._coreService.post('importarexcel/', formData).toPromise();
  }
}
