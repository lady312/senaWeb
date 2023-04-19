import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFaseComponent } from './list-fase.component';

describe('ListFaseComponent', () => {
  let component: ListFaseComponent;
  let fixture: ComponentFixture<ListFaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
