import { Injectable } from "@angular/core";
import { DiaModel } from "@models/dia.model";
import { CoreService } from "./core.service";

@Injectable({
  providedIn: "root",
})
export class DiaService {
  DiaModel: DiaModel;

  constructor(private _coreService: CoreService) {}

  public traerDia() {
    return this._coreService.get<DiaModel[]>("dias");
  }
  public getDiaById(id: number) {
    return this._coreService.get<DiaModel>("dias/" + id);
  }

}
