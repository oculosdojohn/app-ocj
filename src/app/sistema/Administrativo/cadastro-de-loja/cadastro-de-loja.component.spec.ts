import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeLojaComponent } from './cadastro-de-loja.component';

describe('CadastroDeLojaComponent', () => {
  let component: CadastroDeLojaComponent;
  let fixture: ComponentFixture<CadastroDeLojaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeLojaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
