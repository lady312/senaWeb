import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCentroFormacionComponent } from './list-centro-formacion.component';

describe('ListCentroFormacionComponent', () => {
  let component: ListCentroFormacionComponent;
  let fixture: ComponentFixture<ListCentroFormacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCentroFormacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCentroFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
