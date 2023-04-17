import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProyectoFormativoComponent } from './add-proyecto-formativo.component';

describe('AddProyectoFormativoComponent', () => {
  let component: AddProyectoFormativoComponent;
  let fixture: ComponentFixture<AddProyectoFormativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProyectoFormativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProyectoFormativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
