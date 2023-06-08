import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGestionDocumentosComponent } from './list-gestion-documentos.component';

describe('ListGestionDocumentosComponent', () => {
  let component: ListGestionDocumentosComponent;
  let fixture: ComponentFixture<ListGestionDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGestionDocumentosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGestionDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
