import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from './departamento';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  termoBusca: string = '';

  departamentos: Departamento[] = [
      { nome: 'Comercial', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '10' },
      { nome: 'Administrativo', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '15' },
      { nome: 'Laboratório', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '8' },
      { nome: 'Diretoria', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '5' },
      { nome: 'Financeiro', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '12' },
      { nome: 'Marketing', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '10' },
      { nome: 'Comercial', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '10' },
      { nome: 'Comercial', descricao: '', orcamento: 0, telefone: '', email: '', responsavel: 'Everardo Costta', qtdFuncionarios: '10' }
    ];
  
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.departamentos.length / this.itensPorPagina);
  departamentosPaginados: Departamento[] = [];

  constructor(private router: Router) { } 
     
   ngOnInit(): void {
    this.atualizarPaginacao();
   }
     
   cadastrarDepartamento(): void {
     this.router.navigate(['/usuario/cadastro-de-departamento']); 
   }

   onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.departamentosPaginados = this.departamentos.slice(inicio, fim);
  }

  get totalItens() {
    return this.departamentos.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }
}
