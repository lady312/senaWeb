import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgramaComponent } from './list-programa.component';

describe('ListProgramaComponent', () => {
  let component: ListProgramaComponent;
  let fixture: ComponentFixture<ListProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
