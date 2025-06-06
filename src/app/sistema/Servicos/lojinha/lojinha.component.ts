import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Produto } from './produto';

@Component({
  selector: 'app-lojinha',
  templateUrl: './lojinha.component.html',
  styleUrls: ['./lojinha.component.css'],
})
export class LojinhaComponent implements OnInit {
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  produtos: Produto[] = [
    Object.assign(new Produto(), {
      id: '1',
      dataCadastro: '2024-06-01',
      foto: {
        documentoUrl: 'assets/imgs/bg-login.png',
        id: 1,
        name: 'Caneca',
      },
      nome: 'Caneca Personalizada',
      qtdMoedas: 30,
      qtdEstoque: 10,
    }),
    Object.assign(new Produto(), {
      id: '1',
      dataCadastro: '2024-06-01',
      foto: {
        documentoUrl: 'assets/imgs/bg-login.png',
        id: 1,
        name: 'Caneca',
      },
      nome: 'Caneca Personalizada',
      qtdMoedas: 300,
      qtdEstoque: 10,
    }),
    Object.assign(new Produto(), {
      id: '1',
      dataCadastro: '2024-06-01',
      foto: {
        documentoUrl: 'assets/imgs/bg-login.png',
        id: 1,
        name: 'Caneca',
      },
      nome: 'Caneca Personalizada',
      qtdMoedas: 100,
      qtdEstoque: 10,
    }),
  ];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.produtos.length / this.itensPorPagina);
  produtosPaginados: Produto[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarProduto(): void {
    this.router.navigate(['/usuario/cadastro-lojinha-produtos']);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.produtosPaginados = this.produtos.slice(inicio, fim);
  }

  get totalItens() {
    return this.produtos.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  get rotaDashboard(): string {
    if (this.cargoUsuario === Permissao.ADMIN) return '/dashboard-admin';
    if (this.cargoUsuario === Permissao.RH) return '/dashboard-rh';
    if (this.cargoUsuario === Permissao.GERENTE) return '/dashboard-gerente';
    if (
      this.cargoUsuario === Permissao.COLABORADOR ||
      this.cargoUsuario === Permissao.VENDEDOR
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
