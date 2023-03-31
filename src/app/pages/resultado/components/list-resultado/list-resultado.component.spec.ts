import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResultadoComponent } from './list-resultado.component';

describe('ListResultadoComponent', () => {
  let component: ListResultadoComponent;
  let fixture: ComponentFixture<ListResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
