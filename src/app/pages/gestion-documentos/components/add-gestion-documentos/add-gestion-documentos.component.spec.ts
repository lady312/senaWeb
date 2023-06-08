import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGestionDocumentosComponent } from './add-gestion-documentos.component';

describe('AddGestionDocumentosComponent', () => {
  let component: AddGestionDocumentosComponent;
  let fixture: ComponentFixture<AddGestionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGestionDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGestionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
