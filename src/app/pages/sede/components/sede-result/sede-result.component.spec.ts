import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeResultComponent } from './sede-result.component';

describe('SedeResultComponent', () => {
  let component: SedeResultComponent;
  let fixture: ComponentFixture<SedeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SedeResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
