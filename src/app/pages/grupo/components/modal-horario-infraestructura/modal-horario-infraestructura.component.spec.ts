import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHorarioInfraestructuraComponent } from './modal-horario-infraestructura.component';

describe('ModalHorarioInfraestructuraComponent', () => {
  let component: ModalHorarioInfraestructuraComponent;
  let fixture: ComponentFixture<ModalHorarioInfraestructuraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHorarioInfraestructuraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalHorarioInfraestructuraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
