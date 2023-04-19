import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeInfoComponent } from './sede-info.component';

describe('SedeInfoComponent', () => {
  let component: SedeInfoComponent;
  let fixture: ComponentFixture<SedeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
