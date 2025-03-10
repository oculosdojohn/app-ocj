import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registro } from './registro';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {
  termoBusca: string = '';

  registros: Registro[] = [
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' },
    { data: '22/01/2025', loja: 'Óculos do John LTDA', colaborador: 'Everardo Costta', tipo: 'Advertência', classificacao: 'Negativo', autor: 'Vilma' }
  ];
  
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.registros.length / this.itensPorPagina);
  registrosPaginados: Registro[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  cadastrarRegistro(): void {
    this.router.navigate(['/usuario/cadastro-de-registro']);
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.registrosPaginados = this.registros.slice(inicio, fim);
  }

  get totalItens() {
    return this.registros.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
