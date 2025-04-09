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

  departamentos: Departamento[] = [];
  
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
