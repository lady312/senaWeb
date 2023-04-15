import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogruposListComponent } from './tipoGrupos-list.component';

describe('TipogruposListComponent', () => {
  let component: TipogruposListComponent;
  let fixture: ComponentFixture<TipogruposListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogruposListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipogruposListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
