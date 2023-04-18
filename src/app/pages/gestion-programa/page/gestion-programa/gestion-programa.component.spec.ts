import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProgramaComponent } from './gestion-programa.component';

describe('GestionProgramaComponent', () => {
  let component: GestionProgramaComponent;
  let fixture: ComponentFixture<GestionProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
