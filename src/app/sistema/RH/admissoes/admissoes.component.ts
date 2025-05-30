import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdmissaoDemissao } from './admissoes';
import { CargoDescricoes } from '../../Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-admissoes',
  templateUrl: './admissoes.component.html',
  styleUrls: ['./admissoes.component.css'],
})
export class AdmissoesComponent implements OnInit {
  termoBusca: string = '';

  admissoesDemissoes: AdmissaoDemissao[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(
    this.admissoesDemissoes.length / this.itensPorPagina
  );
  admissoesDemissoesPaginados: AdmissaoDemissao[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.admissoesDemissoes = [
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
        status: 'Inativo',
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
    this.admissoesDemissoesPaginados = this.admissoesDemissoes.slice(
      inicio,
      fim
    );
  }

  get totalItens() {
    return this.admissoesDemissoes.length;
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
