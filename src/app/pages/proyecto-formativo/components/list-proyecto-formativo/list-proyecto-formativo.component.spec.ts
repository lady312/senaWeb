import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProyectoFormativoComponent } from './list-proyecto-formativo.component';

describe('ListProyectoFormativoComponent', () => {
  let component: ListProyectoFormativoComponent;
  let fixture: ComponentFixture<ListProyectoFormativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProyectoFormativoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProyectoFormativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
