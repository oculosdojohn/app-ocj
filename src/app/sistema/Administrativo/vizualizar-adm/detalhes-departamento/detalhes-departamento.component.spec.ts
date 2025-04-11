import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDepartamentoComponent } from './detalhes-departamento.component';

describe('DetalhesDepartamentoComponent', () => {
  let component: DetalhesDepartamentoComponent;
  let fixture: ComponentFixture<DetalhesDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
