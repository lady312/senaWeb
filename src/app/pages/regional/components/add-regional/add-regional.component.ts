import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RegionalModel } from '@models/RegionalModel';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-regional',
  templateUrl: './add-regional.component.html',
  styleUrls: ['./add-regional.component.scss']
})
export class AddRegionalComponent implements OnInit {
  @Input() regional: RegionalModel;//actualizar

  @Output() store: EventEmitter<RegionalModel> = new EventEmitter();
  @Output() cancel: EventEmitter<void> = new EventEmitter();

  formRegional: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.regional = {
      id: null,
      nombreRegional: '',
      descripcion: '',

    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setRegional()
  }



  get nombreRegionalField() {
    return this.formRegional.get('nombreRegional');
  }

  get descripcionField() {
    return this.formRegional.get('descripcion');
  }


  setRegional() {
    if (this.regional) {
      this.formRegional.patchValue({
        nombreRegional: this.regional.nombreRegional,
        descripcion: this.regional.descripcion
      })
    }
  }

  private buildForm() {
    this.formRegional = this.formBuilder.group({
      id: [0],
      nombreRegional: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });

    this.formRegional.valueChanges
      .pipe(
        debounceTime(350),
      )
      .subscribe(data => {
      });
  }

  guardarRegional() {
    this.store.emit(this.getRegional());
  }

  closeModal() {
    this.cancel.emit();
  }

  private getControl(nombreRegional: string) {
    return this.formRegional.controls[nombreRegional];
  }


  getRegional(): RegionalModel {
    return {
      id: this.regional?.id,
      descripcion: this.getControl('descripcion').value,
      nombreRegional: this.getControl('nombreRegional').value
    }
  }
}



