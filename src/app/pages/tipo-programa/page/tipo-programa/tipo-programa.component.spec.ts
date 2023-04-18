import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProgramaComponent } from './tipo-programa.component';

describe('TipoProgramaComponent', () => {
  let component: TipoProgramaComponent;
  let fixture: ComponentFixture<TipoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
