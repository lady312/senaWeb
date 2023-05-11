import { TestBed } from '@angular/core/testing';
import { CalendarioComponent } from './calendario.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CalendarioComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CalendarioComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
