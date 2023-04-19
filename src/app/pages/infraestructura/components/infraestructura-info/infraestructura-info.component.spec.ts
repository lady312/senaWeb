import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraInfoComponent } from './infraestructura-info.component';

describe('InfraestructuraInfoComponent', () => {
  let component: InfraestructuraInfoComponent;
  let fixture: ComponentFixture<InfraestructuraInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
