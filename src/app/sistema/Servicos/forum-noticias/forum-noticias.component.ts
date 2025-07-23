import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Noticia, NoticiaResponse } from './noticia';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';
import { NoticiasService } from 'src/app/services/funcionalidades/noticias.service';

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

  noticias: NoticiaResponse[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.noticias.length / this.itensPorPagina);
  noticiasPaginadas: NoticiaResponse[] = [];

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
    this.fetchNoticias();
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  cadastrarNoticia(): void {
    this.router.navigate(['/usuario/cadastro-noticia']);
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
