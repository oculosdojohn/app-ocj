import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeProcedimentosMedicoComponent } from './cadastro-de-procedimentos-medico.component';

describe('CadastroDeProcedimentosMedicoComponent', () => {
  let component: CadastroDeProcedimentosMedicoComponent;
  let fixture: ComponentFixture<CadastroDeProcedimentosMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeProcedimentosMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeProcedimentosMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
