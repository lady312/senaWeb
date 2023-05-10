import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegionalComponent } from './add-regional.component';

describe('AddRegionalComponent', () => {
  let component: AddRegionalComponent;
  let fixture: ComponentFixture<AddRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
