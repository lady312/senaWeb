import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRegionalComponent } from './list-regional.component';

describe('ListRegionalComponent', () => {
  let component: ListRegionalComponent;
  let fixture: ComponentFixture<ListRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
