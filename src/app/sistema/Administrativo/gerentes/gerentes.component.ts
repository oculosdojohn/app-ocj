import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gerente } from './gerente';

@Component({
  selector: 'app-gerentes',
  templateUrl: './gerentes.component.html',
  styleUrls: ['./gerentes.component.css']
})
export class GerentesComponent implements OnInit {
  
  termoBusca: string = '';

  gerentes: Gerente[] = [
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente', departamento: 'Diretoria', status: 'Ativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente geral', departamento: 'Diretoria', status: 'Ativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente geral', departamento: 'Diretoria', status: 'Inativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente geral', departamento: 'Diretoria', status: 'Inativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente', departamento: 'Diretoria', status: 'Inativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente', departamento: 'Diretoria', status: 'Inativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente', departamento: 'Diretoria', status: 'Inativo' },
    { nome: 'Everardo Costa', loja: 'Óculos do John - Loja de Russas', cargo: 'Gerente', departamento: 'Diretoria', status: 'Inativo' }
  ];

  itensPorPagina = 5;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.gerentes.length / this.itensPorPagina);
  gerentesPaginados: Gerente[] = [];

  constructor(private router: Router) { } 
      
  ngOnInit(): void {
    this.atualizarPaginacao();
  }

  cadastrarGerente(): void {
    this.router.navigate(['/usuario/cadastro-de-gerente']); 
  }

  buscarGerente(): void {
    console.log("Buscando gerente:", this.termoBusca);
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.gerentesPaginados = this.gerentes.slice(inicio, fim);
  }

  mudarPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.atualizarPaginacao();
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginacao();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginacao();
    }
  }
}
