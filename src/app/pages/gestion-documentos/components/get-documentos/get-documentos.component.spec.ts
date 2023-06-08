import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDocumentosComponent } from './get-documentos.component';

describe('GetDocumentosComponent', () => {
  let component: GetDocumentosComponent;
  let fixture: ComponentFixture<GetDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
