import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Colaborador } from './colaborador';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  termoBusca: string = '';

  colaboradores: Colaborador[] = [
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Ativo', departamento: 'Comercial' },
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Ativo', departamento: 'Comercial' },
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Ativo', departamento: 'Comercial'},
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Inativo', departamento: 'Comercial' },
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Ativo', departamento: 'Comercial' },
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Inativo', departamento: 'Comercial' },
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Ativo', departamento: 'Comercial' },
        { nome: 'Everardo Costta', loja: 'Óculos do John - Loja de Russas', cargo: 'Consultor', status: 'Inativo', departamento: 'Comercial' }
      ];
    
    itensPorPagina = 6;
    paginaAtual = 1;
    totalPaginas = Math.ceil(this.colaboradores.length / this.itensPorPagina);
    colaboradoresPaginados: Colaborador[] = [];

   constructor(private router: Router) { } 
      
  ngOnInit(): void {
    this.atualizarPaginacao();
  }
      
  cadastrarColaborador(): void {
      this.router.navigate(['/usuario/cadastro-de-colaborador']); 
  }

  onSearch(searchTerm: string) {
    console.log('Search term:', searchTerm);
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

}
