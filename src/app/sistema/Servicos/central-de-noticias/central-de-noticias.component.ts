import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Noticia } from '../forum-noticias/noticia';
import { Permissao } from 'src/app/login/permissao';
import { AuthService } from 'src/app/services/configs/auth.service';
import { NoticiasService } from 'src/app/services/funcionalidades/noticias.service';

@Component({
  selector: 'app-central-de-noticias',
  templateUrl: './central-de-noticias.component.html',
  styleUrls: ['./central-de-noticias.component.css'],
})
export class CentralDeNoticiasComponent implements OnInit {
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

  public Permissao = Permissao;
  public cargoUsuario!: Permissao;

  constructor(
    private router: Router,
    private authService: AuthService,
    private noticiasService: NoticiasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
    this.fetchNoticias();
    this.authService.obterPerfilUsuario().subscribe((usuario) => {
      this.cargoUsuario = ('ROLE_' + usuario.cargo) as Permissao;
    });
  }

  goBack() {
    this.location.back();
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

    const lojasIds: number[] = [];
    const pageNumber = this.paginaAtual;
    const pageSize = this.itensPorPagina;
    const paged = true;

    this.noticiasService
      .getNoticiasFiltradas(
        lojasIds,
        undefined,
        pageNumber,
        pageSize,
        paged
      )
      .subscribe(
        (noticias: Noticia[]) => {
          console.log('Notícias filtradas retornadas:', noticias);
          this.noticias = noticias;
          this.totalPaginas = Math.ceil(
            this.noticias.length / this.itensPorPagina
          );
          this.atualizarPaginacao();
          this.isLoading = false;
        },
        (error) => {
          console.error('Erro ao carregar notícias filtradas:', error);
          this.isLoading = false;
        }
      );
  }

  visualizarNoticia(id: string): void {
    console.log('Visualizando notícia com ID:', id);
    this.router.navigate(['/usuario/detalhes-noticia', id]);
    console.log('Navegando para detalhes da notícia com ID:', id);
  }

  editarNoticia(id: string): void {
    console.log('Editando notícia com ID:', id);
    this.router.navigate(['/usuario/cadastro-noticia', id]);
  }
}
