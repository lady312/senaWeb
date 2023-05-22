import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoInfraFormComponent } from './grupo-infra-form.component';

describe('GrupoInfraFormComponent', () => {
  let component: GrupoInfraFormComponent;
  let fixture: ComponentFixture<GrupoInfraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoInfraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoInfraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
