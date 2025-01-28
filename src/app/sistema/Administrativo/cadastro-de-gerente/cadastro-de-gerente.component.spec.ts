import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeGerenteComponent } from './cadastro-de-gerente.component';

describe('CadastroDeGerenteComponent', () => {
  let component: CadastroDeGerenteComponent;
  let fixture: ComponentFixture<CadastroDeGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroDeGerenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
