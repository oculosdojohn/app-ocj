import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Departamento } from './departamento';
import { DepartamentoService } from '../../../services/administrativo/departamento.service';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css'],
})
export class DepartamentosComponent implements OnInit {
  termoBusca: string = '';

  departamentos: Departamento[] = [];

  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.departamentos.length / this.itensPorPagina);
  departamentosPaginados: Departamento[] = [];

  constructor(
    private router: Router,
    private departamentoService: DepartamentoService
  ) {}

  ngOnInit(): void {
    this.fetchDepartamentos();
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

  fetchDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (departamentos: any[]) => {
        console.log('departamentos retornadas:', departamentos);
        this.departamentos = departamentos;
        this.totalPaginas = Math.ceil(this.departamentos.length / this.itensPorPagina);
        this.atualizarPaginacao();
      },
      (error) => {
        console.error('Erro ao carregar departamentos:', error);
      }
    );
  }

  visualizarDepartamento(id: string): void {
    this.router.navigate(['/usuario/detalhes-departamento', id]);
  }

  editarDepartamento(id: string): void {
    this.router.navigate(['/usuario/cadastro-de-departamento', id]);
  }

  deleteDepartamento(id: string): void {
    if (confirm('Tem certeza que deseja deletar este departamento?')) {
      this.departamentoService.deleteDepartamentoById(id).subscribe(
        () => {
          console.log('Departamento deletada com sucesso!');
          this.fetchDepartamentos();
        },
        (error) => {
          console.error('Erro ao deletar a departamento:', error);
        }
      );
    }
  }
}
