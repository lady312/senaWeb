import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCalendarioComponent } from './list-calendario.component';

describe('ListCalendarioComponent', () => {
  let component: ListCalendarioComponent;
  let fixture: ComponentFixture<ListCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCalendarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
