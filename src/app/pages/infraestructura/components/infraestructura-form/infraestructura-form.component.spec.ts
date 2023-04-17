import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraFormComponent } from './infraestructura-form.component';

describe('InfraestructuraFormComponent', () => {
  let component: InfraestructuraFormComponent;
  let fixture: ComponentFixture<InfraestructuraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
