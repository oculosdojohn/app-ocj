import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loja } from './loja';
import { Endereco } from './endereco';

@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.component.html',
  styleUrls: ['./lojas.component.css'],
})
export class LojasComponent implements OnInit {
  termoBusca: string = '';

  lojas: Loja[] = [
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'},
      { nome: 'Óculos do John - Loja de Russas', endereco: {estado: 'CE', cidade: 'Russas', cep: '62900-000', bairro: 'Centro', rua: 'R. Padre Raul Viêira', numero: '617', logradouro: 'Logradouro A', complemento: ''}, responsavel: 'Everardo Costta', qtdFuncionarios: '12'}
    ];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.lojas.length / this.itensPorPagina);
  lojasPaginados: Loja[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
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
}
