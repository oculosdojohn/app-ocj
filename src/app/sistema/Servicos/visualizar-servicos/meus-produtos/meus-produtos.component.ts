import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';
import { Produto } from '../../lojinha/produto';
import { LojinhaService } from 'src/app/services/funcionalidades/lojinha.service';
import { ColaboradorService } from 'src/app/services/administrativo/colaborador.service';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css'],
})
export class MeusProdutosComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  meusProdutos: Produto[] = [];
  userId!: string;

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.meusProdutos.length / this.itensPorPagina);
  produtosPaginados: Produto[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private lojinhaService: LojinhaService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.atualizarPaginacao();
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
      this.userId = usuario.id;
      this.fetchProdutos();
    });
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.mensagemBusca = '';
      this.fetchProdutos();
      return;
    }
    this.isLoading = true;
    this.lojinhaService.buscarProdutosPorNome(searchTerm).subscribe(
      (produtos: Produto[]) => {
        this.meusProdutos = produtos;
        this.paginaAtual = 1;
        this.totalPaginas = Math.ceil(
          this.meusProdutos.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
        if (!produtos || produtos.length === 0) {
          this.mensagemBusca = 'Busca não encontrada';
        }
      },
      (error) => {
        console.error('Erro ao buscar produtos:', error);
        this.isLoading = false;
        if (error.message && error.message.includes('404')) {
          this.meusProdutos = [];
          this.atualizarPaginacao();
          this.mensagemBusca = 'Busca não encontrada';
        }
      }
    );
  }

  fetchProdutos(): void {
    this.isLoading = true;

    this.lojinhaService.getProdutosResgatadosPorUsuario(Number(this.userId)).subscribe(
      (produtos: any[]) => {
        console.log('Produtos retornadas:', produtos);
        this.meusProdutos = produtos;
        this.totalPaginas = Math.ceil(
          this.meusProdutos.length / this.itensPorPagina
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
    this.produtosPaginados = this.meusProdutos.slice(inicio, fim);
  }

  get totalItens() {
    return this.meusProdutos.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  exibirMensagemDeSucesso(): void {
    const state = window.history.state as { successMessage?: string };
    if (state?.successMessage) {
      this.successMessage = state.successMessage;
      setTimeout(() => (this.successMessage = ''), 3000);
      window.history.replaceState({}, document.title);
    }
  }

  showMessage(type: 'success' | 'error', msg: string) {
    this.clearMessage();
    if (type === 'success') this.successMessage = msg;
    this.messageTimeout = setTimeout(() => this.clearMessage(), 3000);
  }

  clearMessage() {
    this.successMessage = '';
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
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
