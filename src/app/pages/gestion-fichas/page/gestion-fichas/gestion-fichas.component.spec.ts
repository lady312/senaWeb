import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionFichasComponent } from './gestion-fichas.component';

describe('GestionFichasComponent', () => {
  let component: GestionFichasComponent;
  let fixture: ComponentFixture<GestionFichasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionFichasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
