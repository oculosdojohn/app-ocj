import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeRenovacaoContratoComponent } from './cadastro-de-renovacao-contrato.component';

describe('CadastroDeRenovacaoContratoComponent', () => {
  let component: CadastroDeRenovacaoContratoComponent;
  let fixture: ComponentFixture<CadastroDeRenovacaoContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeRenovacaoContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeRenovacaoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
