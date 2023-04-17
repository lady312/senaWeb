import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaResultComponent } from './area-result.component';

describe('AreaResultComponent', () => {
  let component: AreaResultComponent;
  let fixture: ComponentFixture<AreaResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
