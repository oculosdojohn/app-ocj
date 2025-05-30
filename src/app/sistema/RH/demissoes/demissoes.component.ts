import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demissao } from './demissoes';
import { CargoDescricoes } from '../../Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-demissoes',
  templateUrl: './demissoes.component.html',
  styleUrls: ['./demissoes.component.css'],
})
export class DemissoesComponent implements OnInit {
  termoBusca: string = '';

  demissoes: Demissao[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.demissoes.length / this.itensPorPagina);

  demissoesPaginados: Demissao[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.demissoes = [
      {
        colaborador: 'Maria Silva',
        loja: 'Óculos do John - Russas',
        departamento: 'Financeiro',
        cargo: 'Vendedor',
        status: 'Ativo',
      },
      {
        colaborador: 'João Souza',
        loja: 'Óculos do John - Russas',
        departamento: 'Comercial',
        cargo: 'Vendedor',
        status: 'Ativo',
      },
    ];
    this.atualizarPaginacao();
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.demissoesPaginados = this.demissoes.slice(inicio, fim);
  }

  get totalItens() {
    return this.demissoes.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  getDescricaoCargo(cargo: string): string {
    return (
      CargoDescricoes[cargo as keyof typeof CargoDescricoes] ||
      'Cargo desconhecido'
    );
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
