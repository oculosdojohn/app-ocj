import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loja } from './loja';
import { Endereco } from './endereco';
import { LojaService } from '../../../services/administrativo/loja.service';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css'],
})
export class LojasComponent implements OnInit {
  termoBusca: string = '';

  lojas: Loja[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
  lojasPaginados: Loja[] = [];

  constructor(private router: Router, private lojaService: LojaService) {}

  ngOnInit(): void {
    this.fetchLojas();
    this.atualizarPaginacao();
  }

  cadastrarLoja(): void {
    this.router.navigate(['/usuario/cadastro-de-lojas']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.lojasPaginados = this.lojas.slice(inicio, fim);
  }

  get totalItens() {
    return this.lojas.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchLojas(): void {
    this.lojaService.getLojas().subscribe(
      (lojas: any[]) => {
        console.log('Lojas retornadas:', lojas);
        this.lojas = lojas; // Usa os dados retornados diretamente
        this.totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
        this.atualizarPaginacao();
      },
      (error) => {
        console.error('Erro ao carregar lojas:', error);
      }
    );
  }
}
