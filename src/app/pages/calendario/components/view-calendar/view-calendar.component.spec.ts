import { TestBed } from '@angular/core/testing';
import { ComunModule } from '@components/comun.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ComunModule
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ComunModule);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
