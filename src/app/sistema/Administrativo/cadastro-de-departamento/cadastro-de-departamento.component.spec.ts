import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeDepartamentoComponent } from './cadastro-de-departamento.component';

describe('CadastroDeDepartamentoComponent', () => {
  let component: CadastroDeDepartamentoComponent;
  let fixture: ComponentFixture<CadastroDeDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeDepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
