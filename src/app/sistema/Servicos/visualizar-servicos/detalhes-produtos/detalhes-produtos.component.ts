import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LojinhaService } from 'src/app/services/funcionalidades/lojinha.service';
import { Produto } from '../../lojinha/produto';

@Component({
  selector: 'app-detalhes-produtos',
  templateUrl: './detalhes-produtos.component.html',
  styleUrls: ['./detalhes-produtos.component.css'],
})
export class DetalhesProdutosComponent implements OnInit {
  produto!: Produto;

  colaboradores: any[] = [];
  itensPorPagina = 8;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
  colaboradoresPaginados: any[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private lojinhaService: LojinhaService
  ) {}

  ngOnInit(): void {
    this.carregarProduto();
    this.atualizarPaginacao();
  }

  goBack() {
    this.location.back();
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.colaboradoresPaginados = this.colaboradores.slice(inicio, fim);
  }

  get totalItens() {
    return this.colaboradores.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  carregarProduto(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.lojinhaService.getProdutoComHistorico(id).subscribe(
        (response) => {
          this.produto = response.produto;
          this.colaboradores = response.resgates || [];
          this.paginaAtual = 1;
          this.atualizarPaginacao();
          console.log('Dados do produto carregados:', this.produto);
        },
        (error) => {
          console.error('Erro ao carregar os dados do produto:', error);
        }
      );
    }
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }
}
