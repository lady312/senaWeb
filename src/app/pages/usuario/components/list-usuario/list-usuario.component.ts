import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivationCompanyUserModel } from '@models/activation-company-user.model';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss']
})
export class ListUsuarioComponent {

  @Input() usuarios: ActivationCompanyUserModel[] = [];

  @Output() update: EventEmitter<ActivationCompanyUserModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();
  @Output() asignation: EventEmitter<ActivationCompanyUserModel> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
    console.log('user desde list', this.usuarios)
  }

  enviarNumeroRegistros(event:any) {
    this.numReg = event.target.value;
  }

  actualizar(usuario: ActivationCompanyUserModel) {
    this.update.emit(usuario);
  }

  eliminar(idUsuario: number) {
    this.delete.emit(idUsuario);
  }

  agregar() {
    this.create.emit();
  }

  asignar(usuario: ActivationCompanyUserModel) {
    this.asignation.emit(usuario);
  }
}
