import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Produto } from './produto';
import { LojinhaService } from 'src/app/services/funcionalidades/lojinha.service';

@Component({
  selector: 'app-lojinha',
  templateUrl: './lojinha.component.html',
  styleUrls: ['./lojinha.component.css'],
})
export class LojinhaComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  produtos: Produto[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.produtos.length / this.itensPorPagina);
  produtosPaginados: Produto[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private lojinhaService: LojinhaService
  ) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
    this.fetchProdutos();
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarProduto(): void {
    this.router.navigate(['/usuario/cadastro-lojinha-produtos']);
  }

  detalhesProduto(id: string): void {
    this.router.navigate(['/usuario/detalhes-produto', id]);
  }

  onSearch(searchTerm: string) {}

  fetchProdutos(): void {
    this.isLoading = true;

    this.lojinhaService.getProdutos().subscribe(
      (produtos: any[]) => {
        console.log('Produtos retornadas:', produtos);
        this.produtos = produtos;
        this.totalPaginas = Math.ceil(
          this.produtos.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar produtos:', error);
        this.isLoading = false;
      }
    );
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
      this.cargoUsuario === Permissao.CONSULTOR_VENDAS ||
      this.cargoUsuario === Permissao.VENDEDOR ||
      this.cargoUsuario === Permissao.FINANCEIRO ||
      this.cargoUsuario === Permissao.COBRADOR ||
      this.cargoUsuario === Permissao.ESTAGIARIO
    )
      return '/dashboard-colaborador';
    return '/login';
  }
}
