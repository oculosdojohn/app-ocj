import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Renovacao } from './renovacao';
import { CargoDescricoes } from '../../Administrativo/funcionarios/enums/cargo-descricoes';

@Component({
  selector: 'app-renovar-contrato',
  templateUrl: './renovar-contrato.component.html',
  styleUrls: ['./renovar-contrato.component.css'],
})
export class RenovarContratoComponent implements OnInit {
  termoBusca: string = '';

  renovacoes: Renovacao[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.renovacoes.length / this.itensPorPagina);

  renovacoesPaginados: Renovacao[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.renovacoes = [
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
    this.renovacoesPaginados = this.renovacoes.slice(inicio, fim);
  }

  get totalItens() {
    return this.renovacoes.length;
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
