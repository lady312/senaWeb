import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoBusquedaComponent } from './campo-busqueda.component';

describe('CampoBusquedaComponent', () => {
  let component: CampoBusquedaComponent;
  let fixture: ComponentFixture<CampoBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoBusquedaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampoBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
