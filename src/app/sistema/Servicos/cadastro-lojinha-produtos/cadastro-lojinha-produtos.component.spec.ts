import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLojinhaProdutosComponent } from './cadastro-lojinha-produtos.component';

describe('CadastroLojinhaProdutosComponent', () => {
  let component: CadastroLojinhaProdutosComponent;
  let fixture: ComponentFixture<CadastroLojinhaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroLojinhaProdutosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroLojinhaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
