import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTipoProgramaComponent } from './add-tipo-programa.component';

describe('AddTipoProgramaComponent', () => {
  let component: AddTipoProgramaComponent;
  let fixture: ComponentFixture<AddTipoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTipoProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTipoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
