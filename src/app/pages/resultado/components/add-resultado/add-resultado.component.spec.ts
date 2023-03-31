import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultadoComponent } from './add-resultado.component';

describe('AddResultadoComponent', () => {
  let component: AddResultadoComponent;
  let fixture: ComponentFixture<AddResultadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResultadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResultadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
