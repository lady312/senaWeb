import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPagosNominaComponent } from './listar-pagos-nomina.component';

describe('ListarPagosNominaComponent', () => {
  let component: ListarPagosNominaComponent;
  let fixture: ComponentFixture<ListarPagosNominaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPagosNominaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPagosNominaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
