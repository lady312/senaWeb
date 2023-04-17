import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraResultComponent } from './infraestructura-result.component';

describe('InfraestructuraResultComponent', () => {
  let component: InfraestructuraResultComponent;
  let fixture: ComponentFixture<InfraestructuraResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
