import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoProgramaComponent } from './list-tipo-programa.component';

describe('ListTipoProgramaComponent', () => {
  let component: ListTipoProgramaComponent;
  let fixture: ComponentFixture<ListTipoProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTipoProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTipoProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
