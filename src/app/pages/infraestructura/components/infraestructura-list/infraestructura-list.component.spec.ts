import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfraestructuraListComponent } from './infraestructura-list.component';

describe('InfraestructuraListComponent', () => {
  let component: InfraestructuraListComponent;
  let fixture: ComponentFixture<InfraestructuraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfraestructuraListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfraestructuraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
