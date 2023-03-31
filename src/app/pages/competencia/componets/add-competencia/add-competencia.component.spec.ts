import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenciaComponent } from './add-competencia.component';

describe('AddCompetenciaComponent', () => {
  let component: AddCompetenciaComponent;
  let fixture: ComponentFixture<AddCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompetenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
