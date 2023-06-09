import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatriculasRoutingModule } from './matriculas-routing.module';
import { MatriculaComponent } from './page/matricula/matricula.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
// import { StepsModule } from 'primeng/steps';
import { ComunModule } from '@components/comun.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { UsuarioModule } from "../usuario/usuario.module";
import { MatIconModule } from '@angular/material/icon';




@NgModule({
    // schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        MatriculaComponent,
        MatIconModule
    ],
    declarations: [
        MatriculaComponent
    ],
    imports: [
        // TipogrupoModule,
        CommonModule,
        ComunModule,
        MatriculasRoutingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatStepperModule,
        MatFormFieldModule,
        MatInputModule,
        // StepsModule,
        FormsModule,
        UsuarioModule,
    ]
})
export class MatriculasModule { }