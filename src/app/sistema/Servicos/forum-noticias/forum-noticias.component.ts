import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia } from './noticia';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';
import { NoticiasService } from 'src/app/services/funcionalidades/noticias.service';
import { TipoNoticia, TipoNoticiaCor } from './enums/tipo-noticia';
import { TipoNoticiaDescricao } from './enums/tipo-noticia-descricao';

@Component({
  selector: 'app-forum-noticias',
  templateUrl: './forum-noticias.component.html',
  styleUrls: ['./forum-noticias.component.css'],
})
export class ForumNoticiasComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  noticias: Noticia[] = [];

  itensPorPagina = 8;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.noticias.length / this.itensPorPagina);
  noticiasPaginadas: Noticia[] = [];

  lidas = [
    { value: 'false', description: 'Não lidas' },
    { value: 'true', description: 'Lidas' },
  ];
  selectedLida: string = '';

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.exibirMensagemDeSucesso();
    this.atualizarPaginacao();
    this.fetchNoticias();
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  acessarCentralNoticia(): void {
    this.router.navigate(['/usuario/central-de-noticias']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.noticiasPaginadas = this.noticias.slice(inicio, fim);
  }

  get totalItens() {
    return this.noticias.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchNoticias(): void {
    this.isLoading = true;

    this.noticiasService.getNoticias().subscribe(
      (noticias: any[]) => {
        console.log('Notícias retornadas:', noticias);
        this.noticias = noticias;
        this.totalPaginas = Math.ceil(
          this.noticias.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar noticias:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarNoticia(id: string): void {
    console.log('Visualizando notícia com ID:', id);
    this.router.navigate(['/usuario/detalhes-noticia', id]);
    console.log('Navegando para detalhes da notícia com ID:', id);
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

  stripHtmlTags(html: string): string {
    if (!html) return '';
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  getTipoDescricao(tipo: string | TipoNoticia): string {
    const tipoFinal = tipo && tipo !== '' ? tipo : TipoNoticia.COMUNICADO;
    return (
      TipoNoticiaDescricao[tipoFinal as TipoNoticia] ||
      TipoNoticiaDescricao[TipoNoticia.COMUNICADO]
    );
  }

  getTipoCor(tipo: string | TipoNoticia): string {
    const tipoFinal = tipo && tipo !== '' ? tipo : TipoNoticia.COMUNICADO;
    return (
      TipoNoticiaCor[tipoFinal as TipoNoticia] ||
      TipoNoticiaCor[TipoNoticia.COMUNICADO]
    );
  }

  onNoticiaChange() {
    this.isLoading = true;
    console.log('Filtro selecionado:', this.selectedLida);
    if (this.selectedLida === '') {
      this.fetchNoticias();
    } else {
      this.noticiasService
        .getNoticiasLidaOuNaoLida(this.selectedLida)
        .subscribe(
          (noticias) => {
            console.log('Notícias filtradas:', noticias);
            this.noticias = noticias;
            this.totalPaginas = Math.ceil(
              this.noticias.length / this.itensPorPagina
            );
            this.atualizarPaginacao();
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
            this.mensagemBusca = 'Erro ao buscar notícias.';
          }
        );
    }
  }
}
