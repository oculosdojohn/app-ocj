import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from './feedback';

@Component({
  selector: 'app-feedbaks',
  templateUrl: './feedbaks.component.html',
  styleUrls: ['./feedbaks.component.css'],
})
export class FeedbaksComponent implements OnInit {
  termoBusca: string = '';

  feedbacks: Feedback[] = [
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' },
        { data: '22/01/2025', colaborador: 'Everardo Costta', classificacao: 'Para melhorar', autor: 'Vilma' }
      ];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.feedbacks.length / this.itensPorPagina);
  feedbacksPaginados: Feedback[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  cadastrarFeedback(): void {
    this.router.navigate(['/usuario/cadastro-de-feedback']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.feedbacksPaginados = this.feedbacks.slice(inicio, fim);
  }

  get totalItens() {
    return this.feedbacks.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
