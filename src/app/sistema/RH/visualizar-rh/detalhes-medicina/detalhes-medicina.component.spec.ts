import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesMedicinaComponent } from './detalhes-medicina.component';

describe('DetalhesMedicinaComponent', () => {
  let component: DetalhesMedicinaComponent;
  let fixture: ComponentFixture<DetalhesMedicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesMedicinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesMedicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
