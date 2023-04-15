import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogruposComponent } from './tipoGrupos.component';

describe('TipogruposComponent', () => {
  let component: TipogruposComponent;
  let fixture: ComponentFixture<TipogruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogruposComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipogruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
